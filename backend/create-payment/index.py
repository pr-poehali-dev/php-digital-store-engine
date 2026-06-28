import json
import uuid
import os
import psycopg2
import urllib.request
import urllib.parse
import base64

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p83966818_php_digital_store_en')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def handler(event: dict, context) -> dict:
    """Создаёт платёж в ЮКассе и возвращает ссылку для оплаты."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    product_id = body.get('product_id')
    user_email = body.get('email', '').strip().lower()
    user_name = body.get('name', '').strip()

    if not product_id or not user_email:
        return {
            'statusCode': 400,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Необходимы product_id и email'}),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"SELECT id, title, price FROM {SCHEMA}.products WHERE id = %s AND is_active = TRUE",
        (product_id,)
    )
    product = cur.fetchone()
    if not product:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Товар не найден'}),
        }

    prod_id, prod_title, prod_price = product

    idempotence_key = str(uuid.uuid4())
    shop_id = os.environ['YOOKASSA_SHOP_ID']
    secret_key = os.environ['YOOKASSA_SECRET_KEY']
    credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()

    payment_payload = {
        'amount': {'value': f'{prod_price}.00', 'currency': 'RUB'},
        'confirmation': {
            'type': 'redirect',
            'return_url': f'{os.environ.get("SITE_URL", "https://digitalshop.poehali.dev")}/account',
        },
        'capture': True,
        'description': f'Покупка: {prod_title}',
        'receipt': {
            'customer': {'email': user_email},
            'items': [{
                'description': prod_title,
                'quantity': '1.00',
                'amount': {'value': f'{prod_price}.00', 'currency': 'RUB'},
                'vat_code': 1,
                'payment_mode': 'full_payment',
                'payment_subject': 'digital',
            }],
        },
        'metadata': {'product_id': str(prod_id), 'user_email': user_email},
    }

    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=json.dumps(payment_payload).encode(),
        headers={
            'Authorization': f'Basic {credentials}',
            'Idempotence-Key': idempotence_key,
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    with urllib.request.urlopen(req) as resp:
        payment_data = json.loads(resp.read())

    yookassa_id = payment_data['id']
    confirmation_url = payment_data['confirmation']['confirmation_url']

    cur.execute(
        f"INSERT INTO {SCHEMA}.orders (user_email, user_name, product_id, amount, status, yookassa_payment_id) "
        f"VALUES (%s, %s, %s, %s, 'pending', %s) RETURNING id",
        (user_email, user_name, prod_id, prod_price, yookassa_id)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'payment_url': confirmation_url,
            'payment_id': yookassa_id,
        }),
    }

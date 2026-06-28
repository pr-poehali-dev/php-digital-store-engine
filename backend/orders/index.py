import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p83966818_php_digital_store_en')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def handler(event: dict, context) -> dict:
    """Возвращает список оплаченных заказов пользователя по его email."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    email = params.get('email', '').strip().lower()

    if not email:
        return {
            'statusCode': 400,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Необходим параметр email'}),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"SELECT o.id, p.title, p.type, p.emoji, p.gradient, o.amount, o.status, "
        f"o.created_at, o.paid_at, p.delivery_content "
        f"FROM {SCHEMA}.orders o "
        f"JOIN {SCHEMA}.products p ON p.id = o.product_id "
        f"WHERE o.user_email = %s AND o.status = 'paid' "
        f"ORDER BY o.paid_at DESC",
        (email,)
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    cols = ['id', 'title', 'type', 'emoji', 'gradient', 'amount', 'status',
            'created_at', 'paid_at', 'delivery_content']
    orders = []
    for row in rows:
        o = dict(zip(cols, row))
        o['created_at'] = str(o['created_at'])
        o['paid_at'] = str(o['paid_at']) if o['paid_at'] else None
        orders.append(o)

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'orders': orders}, ensure_ascii=False),
    }

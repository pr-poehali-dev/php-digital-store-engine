import json
import os
import psycopg2
import urllib.request
import base64

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p83966818_php_digital_store_en')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def send_email(to_email: str, subject: str, text: str):
    """Простая отправка через ЮКассу нотификации — заглушка (можно заменить на реальный SMTP)."""
    print(f"EMAIL to {to_email}: {subject}\n{text}")


def handler(event: dict, context) -> dict:
    """Вебхук от ЮКассы — обрабатывает успешную оплату и выдаёт доступ к товару."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    event_type = body.get('event')
    payment_obj = body.get('object', {})

    if event_type != 'payment.succeeded':
        return {'statusCode': 200, 'headers': CORS, 'body': 'ok'}

    yookassa_id = payment_obj.get('id')
    metadata = payment_obj.get('metadata', {})
    user_email = metadata.get('user_email')
    product_id = metadata.get('product_id')

    if not yookassa_id:
        return {'statusCode': 400, 'headers': CORS, 'body': 'no payment id'}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute(
        f"SELECT o.id, o.delivery_sent, p.title, p.delivery_content, o.user_email "
        f"FROM {SCHEMA}.orders o "
        f"JOIN {SCHEMA}.products p ON p.id = o.product_id "
        f"WHERE o.yookassa_payment_id = %s",
        (yookassa_id,)
    )
    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': 'order not found'}

    order_id, delivery_sent, prod_title, delivery_content, order_email = row
    email = user_email or order_email

    cur.execute(
        f"UPDATE {SCHEMA}.orders SET status='paid', paid_at=NOW() WHERE id=%s",
        (order_id,)
    )

    cur.execute(
        f"UPDATE {SCHEMA}.products SET sales_count = sales_count + 1 WHERE id=%s",
        (product_id,)
    )

    if not delivery_sent and email:
        send_email(
            to_email=email,
            subject=f'✅ Ваш заказ «{prod_title}» — данные для доступа',
            text=(
                f'Спасибо за покупку!\n\n'
                f'Товар: {prod_title}\n\n'
                f'{delivery_content}\n\n'
                f'С уважением, DigitalShop'
            )
        )
        cur.execute(
            f"UPDATE {SCHEMA}.orders SET delivery_sent=TRUE WHERE id=%s",
            (order_id,)
        )

    conn.commit()
    cur.close()
    conn.close()

    return {'statusCode': 200, 'headers': CORS, 'body': 'ok'}

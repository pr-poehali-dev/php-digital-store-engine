import json
import psycopg2
import os

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p83966818_php_digital_store_en')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def handler(event: dict, context) -> dict:
    """Возвращает список товаров из базы данных с возможностью фильтрации по типу."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    product_type = params.get('type')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if product_type and product_type != 'all':
        cur.execute(
            f"SELECT id, title, description, type, category, price, old_price, emoji, gradient, badge, rating, sales_count "
            f"FROM {SCHEMA}.products WHERE is_active = TRUE AND type = %s ORDER BY sales_count DESC",
            (product_type,)
        )
    else:
        cur.execute(
            f"SELECT id, title, description, type, category, price, old_price, emoji, gradient, badge, rating, sales_count "
            f"FROM {SCHEMA}.products WHERE is_active = TRUE ORDER BY sales_count DESC"
        )

    rows = cur.fetchall()
    cur.close()
    conn.close()

    cols = ['id', 'title', 'description', 'type', 'category', 'price', 'old_price',
            'emoji', 'gradient', 'badge', 'rating', 'sales_count']
    products = [dict(zip(cols, row)) for row in rows]

    for p in products:
        p['rating'] = float(p['rating']) if p['rating'] else 5.0

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'products': products}, ensure_ascii=False),
    }

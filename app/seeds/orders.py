from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    order1 = Order(
        purchaser_id=1, total=122.81, status='Pending')
    order2 = Order(
        purchaser_id=2, total=85.45, status='Pending')
    order3 = Order(
        purchaser_id=3, total=107.34, status='Pending')

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()

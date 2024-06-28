from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(50), nullable = False)
    category = db.Column(db.String(50), nullable = False)
    description = db.Column(db.String(255), nullable =False)
    price = db.Column(db.Numeric, nullable = False)
    stock = db.Column(db.Integer, nullable = False)
    
    #one-to-many products=>product_images
    images = db.relationship(
        'ProductImage',
        back_populates = 'product'
    )

    #many-to-one users=>products
    user = db.relationship(
        'User',
        back_populates = 'products'
    )





    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'price': self.price,
            'stock': self.stock,
            'images': self.images,
        }


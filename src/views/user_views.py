from src.extensions.extensions import db

def create_user(user):
    db.session.add(user)
    db.session.commit()
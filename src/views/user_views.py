from flask import request
from src.models.user import User
from src.extensions.extensions import db

def create_user(user):
    db.session.add(user)
    db.session.commit()
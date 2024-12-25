from src.extensions.extensions import db, bcrypt
from src.models.user import User
from flask_jwt_extended import create_access_token, get_jwt_identity

def create_user(user):
    db.session.add(user)
    db.session.commit()

def validate_user_login(username, password):
    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return "invalid username/password", 401

    token = create_access_token(identity=username)

    return token, 200

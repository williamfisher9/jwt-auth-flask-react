import datetime
import json

from src.extensions.extensions import db, bcrypt
from src.models.user import User
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

def create_user(user):
    try:
        db.session.add(user)
        db.session.commit()
    except IntegrityError as exc:
        return exc.__repr__(), 409

    return user, 201

# validate user login and create jwt access token
def validate_user_login(username, password):
    with open('configs//app-configs.json', 'r') as config_file:
        jwt_expiration_milliseconds = json.load(config_file)["JWT_EXP_MILLISECONDS"]

    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return "invalid username/password", 401

    token = create_access_token(identity=str({"id": user.id, "username": user.username}),
                                expires_delta=datetime.timedelta(milliseconds=jwt_expiration_milliseconds))

    return token, 200

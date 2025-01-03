import datetime
import json

from ..extensions.extensions import db, bcrypt
from ..models.user import User
from ..models.role import Role
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

def create_user(user):
    try:
        admin_role = Role.query.filter_by(name="ADMIN").first()
        user_role = Role.query.filter_by(name="USER").first()

        if not admin_role:
            admin_role = Role(name="ADMIN")
            db.session.add(admin_role)

        if not user_role:
            user_role = Role(name="USER")
            db.session.add(user_role)

        user.role.append(admin_role)
        user.role.append(user_role)

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

    return {"token": token, "user_id": user.id, "username": user.username, "roles": [role.name for role in user.role]}, 200

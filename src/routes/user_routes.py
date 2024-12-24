from flask import Blueprint, request
from ..models.user import User
from ..views.user_views import create_user
from ..extensions.extensions import db

user_blueprint = Blueprint("user_blueprint", __name__)

@user_blueprint.route("/api/v1/users", methods=['GET', 'POST'])
def users_get_post_handler():
    if request.method == 'GET':
        users = User.query.all()
        return {"users": [user.to_dict() for user in users]}

    if request.method == 'POST':
        user_json = request.get_json()
        user = User()
        user.username = user_json['username']
        user.first_name = user_json['first_name']
        user.last_name = user_json['last_name']
        user.password = user_json['password']
        create_user(user)
        return {"response": "user created successfully"}

@user_blueprint.route("/api/v1/users/<id>", methods=['GET', 'DELETE', 'PATCH'])
def user_get_by_id_handler(id):
    if request.method == 'GET':
        user = User.query.filter_by(id=id).first()

        if not user:
            return {"error": "user was not found!"}

        return {"user": user.to_dict()}

    if request.method == 'DELETE':
        user = User.query.filter_by(id=id).first()

        if not user:
            return {"error": "user was not found!"}

        db.session.delete(user)
        db.session.commit()

        return {"user": "user deleted successfully"}

    if request.method == 'PATCH':
        user = User.query.filter_by(id=id).first()

        if not user:
            return {"error": "user was not found"}

        for attr in request.get_json():
            setattr(user, attr, request.get_json()[attr])

        db.session.add(user)
        db.session.commit()

        return {"user": user.to_dict()}
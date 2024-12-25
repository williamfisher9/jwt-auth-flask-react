from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from ..models.user import User
from ..messages.response_message import ResponseMessage
from ..views.user_views import create_user, validate_user_login
from ..extensions.extensions import db, jwt, bcrypt

user_blueprint = Blueprint("user_blueprint", __name__)

@user_blueprint.route("/api/v1/users", methods=['POST'])
def users_post_handler():
    if request.method == 'POST':
        user_json = request.get_json()
        user = User(user_json['username'],
                    bcrypt.generate_password_hash(user_json['password']),
                    user_json['first_name'],
                    user_json['last_name'])
        create_user(user)
        response_message = ResponseMessage(user, 200)
        return {"response": response_message.create_response()}

@user_blueprint.route("/api/v1/users/login", methods=['POST'])
def users_login_handler():
    if request.method == 'POST':
        user_json = request.get_json()

        if not request.get_json()['username'] or not request.get_json()['password']:
            return ResponseMessage("invalid login request format", 403)

        response = validate_user_login(request.get_json()['username'], request.get_json()['password'])
        response_message = ResponseMessage(response[0], response[1])
        return {"response": response_message.create_response()}, response[1]

@user_blueprint.route("/api/v1/users", methods=['GET'])
@jwt_required()
def users_get_handler():
    if request.method == 'GET':
        users = User.query.all()
        response_message = ResponseMessage(users, 200)
        return {"response": response_message.create_response()}

@user_blueprint.route("/api/v1/users/<id>", methods=['GET', 'DELETE', 'PATCH'])
@jwt_required()
def user_get_by_id_handler(id):
    if request.method == 'GET':
        user = User.query.filter_by(id=id).first()

        if not user:
            response_message = ResponseMessage("user was not found!", 404)
            return {"response": response_message.create_response()}

        response_message = ResponseMessage(user, 200)
        return {"response": response_message.create_response()}

    if request.method == 'DELETE':
        user = User.query.filter_by(id=id).first()

        if not user:
            response_message = ResponseMessage("user was not found!", 404)
            return {"response": response_message.create_response()}

        db.session.delete(user)
        db.session.commit()

        response_message = ResponseMessage("user deleted successfully!", 200)
        return {"response": response_message.create_response()}

    if request.method == 'PATCH':
        user = User.query.filter_by(id=id).first()

        if not user:
            response_message = ResponseMessage("user was not found!", 404)
            return {"response": response_message.create_response()}

        for attr in request.get_json():
            setattr(user, attr, request.get_json()[attr])

        db.session.add(user)
        db.session.commit()

        response_message = ResponseMessage(user, 200)
        return {"response": response_message.create_response()}
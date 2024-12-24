from flask import Blueprint, request
from ..models.user import User
from ..response.response_message import ResponseMessage
from ..views.user_views import create_user
from ..extensions.extensions import db

user_blueprint = Blueprint("user_blueprint", __name__)

@user_blueprint.route("/api/v1/users", methods=['GET', 'POST'])
def users_get_post_handler():
    if request.method == 'GET':
        users = User.query.all()

        response_message = ResponseMessage(users, 200)
        return {"response": response_message.create_response()}

    if request.method == 'POST':
        user_json = request.get_json()
        user = User(user_json['username'], user_json['first_name'], user_json['last_name'], user_json['password'])
        create_user(user)
        response_message = ResponseMessage(user, 200)
        return {"response": response_message.create_response()}

@user_blueprint.route("/api/v1/users/<id>", methods=['GET', 'DELETE', 'PATCH'])
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
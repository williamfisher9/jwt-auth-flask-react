from flask import Blueprint, request
from flask_jwt_extended import jwt_required


from src.messages.response_message import ResponseMessage
from src.views.user_views import create_user, validate_user_login
from src.extensions.extensions import db, bcrypt
from src.models.user import User

user_blueprint = Blueprint("user_blueprint", __name__)

@user_blueprint.route("/api/v1/users", methods=['POST'])
def add_new_user():
    if request.method == 'POST':
        user_json = request.get_json()
        user = User(user_json['username'],
                    bcrypt.generate_password_hash(user_json['password']),
                    user_json['first_name'],
                    user_json['last_name'])
        result = create_user(user)
        response_message = ResponseMessage(result[0], result[1])
        return {"response": response_message.create_response()}, result[1]

@user_blueprint.route("/api/v1/users/login", methods=['POST'])
def user_login_handler():
    if request.method == 'POST':
        user_json = request.get_json()

        if not request.get_json()['username'] or not request.get_json()['password']:
            return ResponseMessage("invalid login request format", 403)

        response = validate_user_login(request.get_json()['username'], request.get_json()['password'])
        response_message = ResponseMessage(response[0], response[1])
        return {"response": response_message.create_response()}, response[1]

@user_blueprint.route("/api/v1/users", methods=['GET'])
@jwt_required()
def get_all_users_handler():
    if request.method == 'GET':
        users = User.query.all()
        response_message = ResponseMessage(users, 200)
        return {"response": response_message.create_response()}

@user_blueprint.route("/api/v1/users/<id>", methods=['GET', 'DELETE', 'PATCH'])
@jwt_required()
def handle_user_get_delete_update_by_id(id):
    if request.method == 'GET':
        user = User.query.filter_by(id=id).first()

        if not user:
            response_message = ResponseMessage("user was not found!", 404)
            return {"response": response_message.create_response()}

        is_user_admin = False

        if "ADMIN" in [role.name for role in user.role]:
            is_user_admin = True

        if not is_user_admin:
            response_message = ResponseMessage(user, 200)
            return {"response": response_message.create_response()}
        else:
            users = User.query.all()
            response_message = ResponseMessage(users, 200)
            return {"response": response_message.create_response()}

    if request.method == 'DELETE':
        user = User.query.filter_by(id=id).first()

        if not user:
            response_message = ResponseMessage("user was not found!", 404)
            return {"response": response_message.create_response()}

        try:
            db.session.delete(user)
            db.session.commit()
        except Exception as exc:
            response_message = ResponseMessage(exc.__repr__(), 417)
            return {"response": response_message.create_response()}

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
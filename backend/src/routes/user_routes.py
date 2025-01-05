from flask import Blueprint, request, flash
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

from src.models.menu_items import MenuItem
from src.messages.response_message import ResponseMessage
from src.views.user_views import create_user, validate_user_login
from src.extensions.extensions import db, bcrypt
from src.models.user import User

import os
import uuid
user_blueprint = Blueprint("user_blueprint", __name__)
menu_blueprint = Blueprint("menu_blueprint", __name__)

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@menu_blueprint.route("/api/v1/menu-items", methods=['GET'])
@jwt_required(optional=True)
def get_menu_items():
    current_identity = get_jwt_identity()
    if current_identity:
        menu_items = MenuItem.query.filter_by(role_name="user").all()
        response_message = ResponseMessage(menu_items, 200).create_response()
        return response_message["message"], response_message["status"]
    else:
        menu_items = MenuItem.query.filter_by(role_name="public").all()
        response_message = ResponseMessage(menu_items, 200).create_response()
        return response_message["message"], response_message["status"]



@user_blueprint.route("/api/v1/users/profile-img", methods=['POST'])
@jwt_required()
def upload_user_profile_img():
    if request.method == 'POST':
        # check if the post request has the file part

        user = User.query.filter_by(id=request.values['user_id']).first()

        if not user:
            return {"response": "User was not found"}, 404

        if 'file' not in request.files:
            flash('No file part')
            return {"response": "No file part"}, 404
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return {"response": "No selected file'"}, 404
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join("C://Users//william.fisher//Desktop//sqlite-db//images", str(uuid.uuid4()) + "." + filename.rsplit('.', 1)[1].lower() ))
            return {"response": "file uploaded successfully"}, 200

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
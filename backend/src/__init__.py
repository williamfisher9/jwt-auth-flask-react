from flask import Flask
import json

from src.configs.initial_data import DatabaseInitializer
from src.extensions.extensions import db, jwt, bcrypt, cors
from src.routes.user_routes import user_blueprint, menu_blueprint
import src.configs.logging_config as logging_config
from src.models.role import Role
from src.models.menu_items import MenuItem

if __name__ == '__main__':
    logging_config.initialize_logger()

    app = Flask(__name__)

    app.config.from_file("configs\\app-configs.json", load=json.load)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    with app.app_context():
        DatabaseInitializer()

    app.register_blueprint(user_blueprint)
    app.register_blueprint(menu_blueprint)

    app.run(debug=True, port=8080)

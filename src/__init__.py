from flask import Flask
import json

from src.extensions.extensions import db
from src.models.user import User

from src.routes.user_routes import user_blueprint

import src.configs.logging_config as logging_config
from src.views.user_views import create_user

logging_config.initialize_logger()

app = Flask(__name__)

app.config.from_file("configs\\app-configs.json", load=json.load)

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(user_blueprint)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
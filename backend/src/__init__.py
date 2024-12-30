from flask import Flask
import json
from src.extensions.extensions import db, jwt, bcrypt, cors
from src.routes.user_routes import user_blueprint
import src.configs.logging_config as logging_config

logging_config.initialize_logger()

app = Flask(__name__)

app.config.from_file("configs\\app-configs.json", load=json.load)

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
cors.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(user_blueprint)

if __name__ == '__main__':
    app.run(debug=True, port=8080)

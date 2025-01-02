from flask import Flask
import json
from src.extensions.extensions import db, jwt, bcrypt, cors
from src.routes.user_routes import user_blueprint, menu_blueprint
import src.configs.logging_config as logging_config
from src.models.role import Role
from src.models.menu_items import MenuItem

logging_config.initialize_logger()

app = Flask(__name__)

app.config.from_file("configs\\app-configs.json", load=json.load)

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
cors.init_app(app)

with app.app_context():
    db.create_all()
    roles = Role.query.all()
    menu_items = MenuItem.query.all()

    if len(roles) == 0:
        admin_role = Role(name="ADMIN")
        user_role = Role(name="USER")
        db.session.add_all([admin_role, user_role])
        db.session.commit()

    if len(menu_items) == 0:
        menu_item_1 = MenuItem("login", "fa-arrow-right-to-bracket", "/login", "public")
        menu_item_2 = MenuItem("register", "fa-user-plus", "/register", "public")
        menu_item_3 = MenuItem("logout", "fa-right-from-bracket", "/logout", "user")
        db.session.add_all([menu_item_1, menu_item_2, menu_item_3])
        db.session.commit()

app.register_blueprint(user_blueprint)
app.register_blueprint(menu_blueprint)

if __name__ == '__main__':
    app.run(debug=True, port=8080)

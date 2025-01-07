from src.extensions.extensions import db
from src.models.role import Role
from src.models.menu_items import MenuItem
import logging

class DatabaseInitializer:
    def __init__(self):
        logger = logging.getLogger(__name__)
        logger.info("Create tables that do not exist in the database by calling metadata.create_all()")
        logger.info("This does not update existing tables, use a migration library for that.")
        db.create_all()
        roles = Role.query.all()
        menu_items = MenuItem.query.all()

        logger.info("Checking if roles and menu items should be created...")
        if len(roles) == 0:
            logger.info("Roles will be created soon...")
            admin_role = Role(name="ADMIN")
            user_role = Role(name="USER")
            db.session.add_all([admin_role, user_role])
            db.session.commit()
            logger.info("Roles created successfully")

        if len(menu_items) == 0:
            logger.info("Menu Items will be created soon...")
            menu_item_1 = MenuItem("login", "fa-arrow-right-to-bracket", "/login", "public")
            menu_item_2 = MenuItem("register", "fa-user-plus", "/register", "public")
            menu_item_3 = MenuItem("home", "fa-home", "/user-home", "user")
            menu_item_4 = MenuItem("users", "fa-users", "/settings", "user")
            menu_item_5 = MenuItem("logout", "fa-right-from-bracket", "/logout", "user")
            db.session.add_all([menu_item_1, menu_item_2, menu_item_3, menu_item_4, menu_item_5])
            db.session.commit()
            logger.info("Menu Items created successfully")
from sqlalchemy.orm import Mapped, mapped_column
from src.extensions.extensions import db

class MenuItem(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    menu_item_name: Mapped[str] = mapped_column(nullable=False)
    menu_item_icon: Mapped[str] = mapped_column(nullable=False)
    menu_item_link: Mapped[str] = mapped_column(nullable=False)
    role_name: Mapped[str] = mapped_column(nullable=False)

    def __init__(self, menu_item_name, menu_item_icon, menu_item_link, role_name):
        self.menu_item_name = menu_item_name
        self.menu_item_icon = menu_item_icon
        self.menu_item_link = menu_item_link
        self.role_name = role_name

    def to_dict(self):
        return {
            "id": self.id,
            "menu_item_name": self.menu_item_name,
            "menu_item_icon": self.menu_item_icon,
            "menu_item_link": self.menu_item_link,
            "role_name": self.role_name
        }
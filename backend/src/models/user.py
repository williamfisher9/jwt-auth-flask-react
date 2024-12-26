from flask_login import UserMixin
from sqlalchemy.orm import Mapped, mapped_column

from ..extensions.extensions import db

class User(db.Model, UserMixin):
    __tablename__ = "users"

    """
    id : Mapped[int] = mapped_column(primary_key=True)
    username : Mapped[str] = mapped_column(unique=True, nullable=False)
    first_name : Mapped[str] = mapped_column(nullable=True)
    last_name : Mapped[str] = mapped_column(nullable=True)
    password : Mapped[str] = mapped_column(nullable=True)
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, username: str, password: str, first_name: str, last_name: str):
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return f'<User {self.id} {self.username} {self.first_name} {self.last_name} {self.password}>'

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name
        }

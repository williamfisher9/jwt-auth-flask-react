from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import DeclarativeBase

from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from flask_cors import CORS

convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

class Base(DeclarativeBase):
    metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(model_class=Base)

bcrypt = Bcrypt()
jwt = JWTManager()

cors = CORS()
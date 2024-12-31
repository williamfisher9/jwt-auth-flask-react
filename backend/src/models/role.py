from src.extensions.extensions import db

class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), unique=True)
    user = db.relationship('User', secondary='user_roles', back_populates='role')

    # join table
    user_roles = db.Table(
        'user_roles',
        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
        db.Column('role_id', db.Integer, db.ForeignKey('roles.id'))
    )

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f'{self.name}'

    def __repr__(self):
        return f'<Role {self.name}>'
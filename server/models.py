from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    age = db.Column(db.Integer)

    logs = db.relationship(
        'Log', back_populates='user', cascade='all, delete-orphan')
    
    workouts = db.relationship(
        'Workout', secondary='logs', viewonly=True, back_populates='users'
    )

    serialize_rules = ('-logs', '-workouts.users')

    # serialize_rules = ('-logs.user',)

    # workouts = association_proxy('logs', 'workout',
    #                              creator=lambda workout_obj: Log(workout=workout_obj))

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    

class Workout(db.Model, SerializerMixin):
    __tablename__='workouts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    logs = db.relationship(
        'Log', back_populates='workout', cascade='all, delete-orphan')
    
    users = db.relationship(
        'User', secondary='logs', viewonly=True, back_populates='workouts'
    )

    # serialize_rules = ('-logs','-users.workouts')
    serialize_rules = ('-logs.user', '-logs.workout','-users.workouts')


    # serialize_rules = ('-logs.workout',)

    # users = association_proxy('logs', 'user',
    #                              creator=lambda user_obj: Log(user=user_obj))

    @validates("name", "difficulty", "description")
    def validate_all_colums_for_workout(self, key, value):
        if value is None or value.strip()=="":
            raise ValueError("A workout must have a name, difficulty level and a description.")
        return value


class Log(db.Model, SerializerMixin):
    __tablename__='logs'

    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.String, default="No note provided")
    date = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    user = db.relationship('User', back_populates='logs')
    workout = db.relationship('Workout', back_populates='logs')

    serialize_rules = ('-user.logs', '-workout.logs',)

    @validates("date", "user_id", "workout_id")
    def date_validate_user_id_and_workout_id(self, key, value):
        if value is None:
            raise ValueError("A log must have a date, user id and a workout id.")
        return value
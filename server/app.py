#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Workout, Log

app.secret_key = b'?w\x85Z\x08Q\xbdO\xb8\xa9\xb65Kj\xa9_'

# Views go here!

@app.before_request
def check_if_logged_in():
    user_id = session.get("user_id")
    # public_endpoints = ['login', 'signup', 'check_session', 'workouts', 'users']  # for tesing !!!!!!
    public_endpoints = ['login', 'signup', 'check_session', 'workouts']
    if not user_id and request.endpoint not in public_endpoints:
        return {'error': 'Unauthorized'}, 401


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                # ------------------------------------------
                user_data = {
                    "id": user.id,
                    "username": user.username,
                    "age": user.age,
                    "workouts": []
                }

                for workout in user.workouts:
                    # Filter logs to only those for this user
                    user_logs = [
                        {
                            "id": log.id,
                            "note": log.note,
                            "date": log.date,
                            "user_id": log.user_id,
                            "workout_id": log.workout_id
                        }
                        for log in workout.logs
                        if log.user_id == user.id
                    ]

                    workout_dict = {
                        "id": workout.id,
                        "name": workout.name,
                        "difficulty": workout.difficulty,
                        "description": workout.description,
                        "logs": user_logs
                    }

                    user_data["workouts"].append(workout_dict)
                # ---------------------------------------------
                # return user.to_dict(), 200
                return user_data, 200

        return {'error': 'Please Log in first!'}, 401


class Login(Resource):
    def post(self):
        user_data = request.get_json()

        username = user_data.get('username')
        password = user_data.get('password')

        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id

            user_data = {
                "id": user.id,
                "username": user.username,
                "age": user.age,
                "workouts": []
            }

            for workout in user.workouts:
                user_logs = [
                    {
                        "id": log.id,
                        "note": log.note,
                        "date": log.date,
                        "user_id": log.user_id,
                        "workout_id": log.workout_id
                    }
                    for log in workout.logs
                    if log.user_id == user.id
                ]
                workout_dict = {
                    "id": workout.id,
                    "name": workout.name,
                    "difficulty": workout.difficulty,
                    "description": workout.description,
                    "logs": user_logs
                }
                user_data["workouts"].append(workout_dict) 

            return user_data, 200

        return {'error': 'Invalid username or password'}, 401


class Logout(Resource):
    def delete(self):

        session['user_id'] = None
        return {}, 204
    


class Signup(Resource):
    def post(self):
        user_data = request.get_json()

        username = user_data.get('username')
        password = user_data.get('password')

        errors = []

        if not username or not password:
            errors.append('Username and password are required')
            return {'errors': errors}, 422
        
        try:
            user = User(username=username)
            user.password_hash = password

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            user_data = {
                "id": user.id,
                "username": user.username,
                "age": user.age,
                "workouts": []
            }

            return user_data, 201
        
        except IntegrityError:
            db.session.rollback()
            # errors.append('Username must be unique')
            # return {'errors': errors}, 422
            return {'errors': ['Username must be unique']}, 422



class Workouts(Resource):
    def get(self):
        # workouts = [workout.to_dict() for workout in Workout.query.all()]
        # return make_response(workouts, 200)
        user_id = session.get("user_id")
        workouts = []

        for workout in Workout.query.all():
            workout_dict = workout.to_dict()
            if user_id:
                # Only include logs for the current user
                workout_dict['logs'] = [
                    {
                        "id": log.id,
                        "note": log.note,
                        "date": log.date,
                        "user_id": log.user_id,
                        "workout_id": log.workout_id
                    }
                    for log in workout.logs
                    if log.user_id == user_id
                ]
            else:
                workout_dict['logs'] = []
            workouts.append(workout_dict)

        return workouts, 200


    def post(self):
        data = request.get_json() 
        try:
            new_workout = Workout(name=data.get('name'), difficulty=data.get('difficulty'), \
                                  description=data.get("description"))
            db.session.add(new_workout)
            db.session.commit()
            return make_response(new_workout.to_dict(), 201)
        except ValueError:
            db.session.rollback()
            return {'errors': ["validation errors"]}, 400


class Logs(Resource):

    def post(self):
        data = request.get_json()
        # user = User.query.filter(User.id == data.get('user_id')).first()
        workout = Workout.query.filter(Workout.id == data.get('workout_id')).first()

        if workout and session.get("user_id"):
            try:
                new_log = Log(note=data.get('note'), date=data.get('date'), \
                                user_id=session.get("user_id"), \
                                workout_id=data.get('workout_id'))
                db.session.add(new_log)
                db.session.commit()
                return make_response(new_log.to_dict(), 201)
            except ValueError:
                db.session.rollback()
                return {'errors': ["validation errors"]}, 400
            
        return {'errors': ["validation errors"]}, 400
    
    def patch(self):
        data = request.get_json()
        log = Log.query.filter(Log.id == data.get('id')).first()

        if log:
            try:
                log.date = data.get('date')
                log.note = data.get('note')

                db.session.add(log)
                db.session.commit()
                return make_response(log.to_dict(), 202)
            except ValueError:
                db.session.rollback()
                return {'errors': ["validation errors"]}, 400

        return {'error': 'Log not found'}, 404
    
    def delete(self):
        data = request.get_json()
        log = Log.query.filter(Log.id == data.get('id')).first()

        if log:
            try:
                db.session.delete(log)
                db.session.commit()
                return {}, 204
            except Exception as e:
                db.session.rollback()
                return {'errors': [str(e)]}, 400

        return {'error': 'Log not found'}, 404
    


# class Users(Resource):  # this route is only for testing !!!!!!!!!!!!!!!!!!!!!
#     def get(self):
#         # users= [user.to_dict() for user in User.query.all()]
#         # return make_response(users, 200)
#         users = User.query.all()
#         users_data = []

#         for user in users:
#             user_data = {
#                 "id": user.id,
#                 "username": user.username,
#                 "age": user.age,
#                 "workouts": []
#             }

#             for workout in user.workouts:
#                 user_logs = [
#                     {
#                         "id": log.id,
#                         "note": log.note,
#                         "date": log.date,
#                         "user_id": log.user_id,
#                         "workout_id": log.workout_id
#                     }
#                     for log in workout.logs
#                     if log.user_id == user.id
#                 ]

#                 workout_dict = {
#                     "id": workout.id,
#                     "name": workout.name,
#                     "difficulty": workout.difficulty,
#                     "description": workout.description,
#                     "logs": user_logs
#                 }

#                 user_data["workouts"].append(workout_dict)

#             users_data.append(user_data)

#         return users_data, 200

api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Workouts, '/workouts', endpoint='workouts')
api.add_resource(Logs, '/logs', endpoint='logs')
# api.add_resource(LogByID, '/logs/<int:user_id>/<int:workout_id>', endpoint='log_by_id')
# api.add_resource(Users, '/users', endpoint='users')  # this route is only for testing !!!!!!!!!!

if __name__ == '__main__':
    app.run(port=5555, debug=True)


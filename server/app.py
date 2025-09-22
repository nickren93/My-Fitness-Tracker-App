#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Workout, Log

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and request.endpoint != 'index' \
        and request.endpoint != 'login':
        return {'error': 'Please log in first'}, 401



class CheckSession(Resource):
    def get(self):
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
        return {'error': 'Please Log in first!'}, 401



class Login(Resource):
    def post(self):
        user_data = request.get_json()

        username = user_data.get('username')
        password = user_data.get('password')

        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401


class Logout(Resource):
    def delete(self):

        session['user_id'] = None
        return {}, 204


class Workout(Resource):
     def get(self):
        workouts = [{"id": workout.id, "name": workout.name, "difficulty": workout.difficulty, \
                     "description": workout.description} 
                   for workout in Workout.query.all()]
        return make_response(workouts, 200)



if __name__ == '__main__':
    app.run(port=5555, debug=True)


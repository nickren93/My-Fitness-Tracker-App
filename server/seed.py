#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Workout, Log

fake=Faker()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        # Delete all rows in tabels
        print("Clearing db...")
        User.query.delete()
        Workout.query.delete()
        Log.query.delete()

        # Add workouts:
        print("Seeding workouts...")
        w1 = Workout(name="Lunge", difficulty="easy", description=fake.sentence())
        w2 = Workout(name="Squat", difficulty="easy", description=fake.sentence())
        w3 = Workout(name="Bent-over row", difficulty="easy", description=fake.sentence())
        w4 = Workout(name="Burpees", difficulty="easy", description=fake.sentence())
        w5 = Workout(name="Shoulder press", difficulty="medium", description=fake.sentence())
        w6 = Workout(name="Pull-up", difficulty="hard", description=fake.sentence())
        w7 = Workout(name="Bicep curl", difficulty="easy", description=fake.sentence())
        w8 = Workout(name="Plank", difficulty="medium", description=fake.sentence())
        db.session.add_all([w1, w2, w3, w4, w5, w6, w7, w8])
        db.session.commit()

        # Add users:
        print("Seeding users...")
        u1 = User(username = 'Nick', age='32')
        u1.password_hash = 'mimashi'
        u2 = User(username = 'Inna', age='35')
        u2.password_hash = '1234'
        u3 = User(username = 'Bobby', age='7')
        u3.password_hash = '6666'
        db.session.add_all([u1, u2, u3])
        db.session.commit()

        # Add logs:
        print("Seeding logs...")
        l1 = Log(note=fake.sentence(), date=fake.date() , user=u1, workout=w7)
        l2 = Log(note=fake.sentence(), date=fake.date(), user=u1, workout=w5)
        l3 = Log(note=fake.sentence(), date=fake.date(), user=u1, workout=w6)
        l4 = Log(note=fake.sentence(), date=fake.date(), user=u1, workout=w2)
        l5 = Log(note=fake.sentence(), date=fake.date(), user=u2, workout=w2)
        l6 = Log(note=fake.sentence(), date=fake.date(), user=u2, workout=w3)
        l7 = Log(note=fake.sentence(), date=fake.date(), user=u2, workout=w6)
        l8 = Log(note=fake.sentence(), date=fake.date(), user=u3, workout=w8)
        db.session.add_all([l1, l2, l3, l4, l5, l6, l7, l8])
        db.session.commit()

        print("Done seeding!")
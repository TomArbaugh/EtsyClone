from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=3, max=30, message='Username must be between 3 and 30 characters'), username_exists])
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=3, max=30, message='First name must be between 3 and 30 characters')])
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=3, max=30, message='Last name must be between 3 and 30 characters')])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20, message='Password must be between 6 and 20 characters')])

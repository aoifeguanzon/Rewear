"""
@file models.py
@author Valerie Pena
@brief Defines the UserModel for storing user accounts in DynamoDB using PynamoDB.
"""

from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute

class UserModel(Model):
    class Meta:
        table_name = "rewear-users-v2"
        region = "us-east-1"

    username = UnicodeAttribute(hash_key=True)
    email = UnicodeAttribute()    
    password = UnicodeAttribute()


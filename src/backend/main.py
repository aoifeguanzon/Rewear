from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import UserModel
import bcrypt

app = FastAPI()

class SignupRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username_or_email: str
    password: str

@app.get("/")
def read_root():
    return {"message": "Hello Rewear! FastAPI is running 🚀"}

@app.post("/signup")
async def signup(request: SignupRequest):
    username = request.username
    email = request.email
    password = request.password

    try:
        if UserModel.get(username, consistent_read=True):
            raise HTTPException(status_code=400, detail="Username already taken.")
    except UserModel.DoesNotExist:
        pass

    existing_users = UserModel.scan(UserModel.email == email)
    if list(existing_users):
        raise HTTPException(status_code=400, detail="Email already in use.")

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user = UserModel(username=username, email=email, password=hashed_pw)
    user.save()

    return {"message": "User created successfully!"}

@app.post("/login")
async def login(data: LoginRequest):
    identifier = data.username_or_email
    password = data.password

    try:
        user = UserModel.get(identifier, consistent_read=True)
        if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return {"message": "Login successful!"}
        else:
            raise HTTPException(status_code=400, detail="Incorrect password.")
    except UserModel.DoesNotExist:
        users_by_email = list(UserModel.scan(UserModel.email == identifier))
        if users_by_email:
            user = users_by_email[0]
            if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                return {"message": "Login successful!"}
            else:
                raise HTTPException(status_code=400, detail="Incorrect password.")
        else:
            raise HTTPException(status_code=400, detail="User not found.")


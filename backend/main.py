from typing import *
from pathlib import Path
import datetime
import sys

from fastapi import FastAPI, File, UploadFile, Response, Form
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
import socketio

app = FastAPI()
database = {"users": dict()}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"info": "Hello World"}


@app.post("/image/uploaddesktop/")
async def create_file(file: UploadFile = File(), username: str = Form()):
    try:
        print(username)
        contents = file.file.read()
        directory = "database"
        Path(f"{directory}/").mkdir(parents=True, exist_ok=True)
        filename = f"{directory}/{username}.png"
        with open(filename, "wb+") as f:
            f.write(contents)
            database["users"]["username"] = set()
    except:
        return {"error": "error uploading the desktop screenshot :("}
    finally:
        file.file.close()
        return {"msg": "successfully uploaded desktop file"}


@app.get("/image/usernames")
async def get_usernames():
    """
    Returns a list of usernames to get the images from
    """
    try:
        source_dir = Path("database/")
        files = source_dir.iterdir()
        usernames = [f.name.split(".")[0] for f in files]
        return {"files": usernames}
    except:
        return {"error": "failure collecting filenames"}


@app.get(
    "/image/get",
    responses={200: {"content": {"image/png": {}}}},
    response_class=Response,
)
async def get_file(username: str):
    """
    Returns an image from the database
    """
    source_dir = Path("database/")
    files = source_dir.iterdir()
    usernames = [f.name.split(".")[0] for f in files]
    if username not in usernames:
        return {"error": f"username {username} not found"}
    return FileResponse(f"database/{username}.png")


@app.get("/user")
async def get_user(username: str):
    """
    Get the information of the user with the given username
    """
    if username in database["users"]:
        return {"user": database.get(username)}
    else:
        return {"error": "could not find user :("}


@app.post("/like")
async def like_post(target_usr: str, source_usr: str):
    """
    Like the target user's post from source user
    """
    if target_usr not in database["users"]:
        return {"error": f"target user {target_usr} not in users"}
    if source_usr not in database["users"]:
        return {"error": f"source user {source_usr} not in users"}

    database["users"][target_usr].add(source_usr)


@app.post("/unlike")
async def unlike_post(target_usr: str, source_usr: str):
    """
    Unlike the target user's post from source user
    """
    if target_usr not in database["users"]:
        return {"error": f"target user {target_usr} not in users"}
    if source_usr not in database["users"]:
        return {"error": f"source user {source_usr} not in users"}

    database["users"][target_usr].remove(source_usr)


@app.get("/likes")
async def get_likes(username: str):
    """
    Get the number of likes of a user's post
    """
    if username not in database["users"]:
        return {"error": f"user {username} not in users"}

    return {"likes": len(database["users"][username])}

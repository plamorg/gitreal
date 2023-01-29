from typing import *
from pathlib import Path
import datetime
import sys

from fastapi import FastAPI, File, UploadFile, Response, Form, Request
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


def create_file(file: UploadFile, username: str, directory: str):
    """
    Create a file in the given directory attached to the given username
    """
    try:
        contents = file.file.read()
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


@app.post("/image/uploaddesktop/")
async def create_file_desktop(file: UploadFile = File(), username: str = Form()):
    """
    Create a file in the directory for desktop shots
    """
    return create_file(file, username, "database")


@app.post("/webcam/upload/")
async def create_file_webcam(file: UploadFile = File(), username: str = Form()):
    """
    Create a file in the directory for webcam shots
    """
    return create_file(file, username, "webcam")


def get_usernames(directory: str):
    """
    Returns a list of usernames to get the images from
    """
    try:
        source_dir = Path(directory)
        files = source_dir.iterdir()
        usernames = [f.name.split(".")[0] for f in files]
        return {"files": usernames}
    except:
        return {"error": "failure collecting filenames"}


@app.get("/image/usernames")
async def get_usernames_desktop():
    """
    Returns a list of usernames to get the desktop images from
    """
    return get_usernames("database/")


@app.get("/webcam/usernames")
async def get_username_webcam():
    """
    Returns a list of usernames to get the desktop images from
    """
    return get_usernames("webcam/")


def get_file(username: str, directory: str):
    """
    Returns an image from the database
    """
    source_dir = Path(directory)
    files = source_dir.iterdir()
    usernames = [f.name.split(".")[0] for f in files]
    if username not in usernames:
        return {"error": f"username {username} not found"}
    return FileResponse(f"{directory}/{username}.png")

@app.get(
    "/image/get",
    responses={200: {"content": {"image/png": {}}}},
    response_class=Response,
)
async def get_file_desktop(username: str):
    """
    Returns an image from the desktop database
    """
    return get_file(username, "database/")

@app.get(
    "/webcam/get",
    responses={200: {"content": {"image/png": {}}}},
    response_class=Response,
)
async def get_file_webcam(username: str):
    """
    Returns an image from the desktop database
    """
    return get_file(username, "webcam/")

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
async def like_post(liker: Request):
    """
    Like the target user's post from source user
    """
    liker = await liker.json()
    if liker["targetuser"] not in database["users"]:
        database["users"][liker["targetuser"]] = set()
    if liker["sourceuser"] not in database["users"]:
        database["users"][liker["sourceuser"]] = set()

    if liker["sourceuser"] not in database["users"][liker["targetuser"]]:
        database["users"][liker["targetuser"]].add(liker["sourceuser"])

    return {"likes": len(database["users"][liker["targetuser"]])}


@app.post("/unlike")
async def unlike_post(liker: Request):
    """
    Unlike the target user's post from source user
    """
    liker = await liker.json()
    if liker["targetuser"] not in database["users"]:
        database["users"][liker["targetuser"]] = set()
    if liker["sourceuser"] not in database["users"]:
        database["users"][liker["sourceuser"]] = set()

    if liker["sourceuser"] in database["users"][liker["targetuser"]]:
        database["users"][liker["targetuser"]].remove(liker["sourceuser"])

    return {"likes": len(database["users"][liker["targetuser"]])}


@app.get("/likes")
async def get_likes(username: str):
    """
    Get the number of likes of a user's post
    """
    if username not in database["users"]:
        return {"error": f"user {username} not in users"}

    return {"likes": len(database["users"][username])}

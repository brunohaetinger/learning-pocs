import os
import httpx
from fastapi import FastAPI, Depends, Request
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params={"scope": "openid email profile"},
    access_token_url="https://oauth2.googleapis.com/token",
    client_kwargs={"token_endpoint_auth_method": "client_secret_post"},
)

@app.get("/login")
async def login(request: Request):
    redirect_uri = os.getenv("REDIRECT_URI")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth/callback")
async def auth_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)
    return {"user": user_info}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

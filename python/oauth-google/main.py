import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from authlib.integrations.starlette_client import OAuth
from starlette.middleware.sessions import SessionMiddleware  # Correct import
from dotenv import load_dotenv
from typing import TypedDict, Dict, Any  # Import necessary types

load_dotenv()

app = FastAPI()

# Add Session Middleware with a strong secret key
app.add_middleware(SessionMiddleware, secret_key="super_secret_key")



class UserInfo(TypedDict):
    iss: str
    azp: str
    aud: str
    sub: str
    email: str
    email_verified: bool
    at_hash: str
    nonce: str
    name: str
    picture: str
    given_name: str
    family_name: str
    iat: int
    exp: int

class TokenType(TypedDict):
    access_token: str
    expires_in: int
    scope: str
    token_type: str
    id_token: str
    expires_at: int
    userinfo: UserInfo


oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",  # Auto-fetch metadata
    client_kwargs={"scope": "openid email profile"},
)

@app.get("/login")
async def login(request: Request):
    redirect_uri = os.getenv("REDIRECT_URI")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth/callback")
async def auth_callback(request: Request) -> HTMLResponse:
    token: TokenType = await oauth.google.authorize_access_token(request)
    user_info = token.get('userinfo')

    # Create an HTML response with user information
    html_content = f"""
    <html>
        <head>
            <title>User Profile</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f9;
                }}
                .profile {{
                    text-align: center;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }}
                .profile img {{
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                }}
                .profile h1 {{
                    margin: 10px 0;
                    font-size: 24px;
                }}
                .profile p {{
                    color: #555;
                }}
            </style>
        </head>
        <body>
            <div class="profile">
                <img src="{user_info['picture']}" alt="Profile Picture">
                <h1>{user_info['name']}</h1>
                <p>{user_info['email']}</p>
            </div>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


# @app.route("/auth")
# async def auth(request: Request):
#     token = await oauth.google.authorize_access_token(request)

#     if "id_token" not in token:
#         raise HTTPException(status_code=400, detail="Missing ID token in OAuth response")

#     user_info = await oauth.google.parse_id_token(request, token)
    
#     return JSONResponse({"user": user_info})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

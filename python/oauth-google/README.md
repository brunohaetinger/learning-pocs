# OAuth-google

Integration with Google using OAuth

## Setup on Console

1. Set Up a Google OAuth Client
1.1 Create a Google Cloud Project

    Go to the Google Cloud Console.
    Create a new project or select an existing one.

1.2 Enable OAuth API

    Navigate to APIs & Services > Library.
    Enable Google Identity Services API.

1.3 Create OAuth 2.0 Credentials

    Go to APIs & Services > Credentials.
    Click Create Credentials > OAuth 2.0 Client ID.
    Configure:
        Application Type: Web Application
        Authorized Redirect URIs:
            If running locally: http://localhost:8000/auth/callback
            If deployed: <your_domain>/auth/callback
    Click Create and save the Client ID and Client Secret.


## Running it:

> uvicorn main:app --reload
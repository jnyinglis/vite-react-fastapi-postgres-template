from pydantic import BaseModel, EmailStr
from typing import Optional


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class TokenRefresh(BaseModel):
    refresh_token: str


class EmailAuth(BaseModel):
    email: EmailStr
    password: str


class EmailRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None


class MagicLinkRequest(BaseModel):
    email: EmailStr


class MagicLinkVerify(BaseModel):
    token: str


class GoogleAuthRequest(BaseModel):
    credential: str  # Google ID token


class AppleAuthRequest(BaseModel):
    authorization: dict  # Contains code and id_token
    user: Optional[dict] = None  # Contains name and email for first-time users


class PasswordReset(BaseModel):
    token: str
    new_password: str


class PasswordResetRequest(BaseModel):
    email: EmailStr
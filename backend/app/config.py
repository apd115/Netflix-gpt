from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    DATABASE_URL: str = "sqlite:///./netflix_gpt.db"

    # No default on purpose: the app refuses to start without a real secret.
    SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_MINUTES: int = 15

    REFRESH_TOKEN_DAYS: int = 7
    REFRESH_COOKIE_NAME: str = "refresh_token"
    COOKIE_SECURE: bool = False  # set True in production (HTTPS only)

    # Account lockout
    MAX_FAILED_LOGINS: int = 5
    LOCKOUT_MINUTES: int = 15

    # Rate limits: max requests per minute, per IP address
    RATE_LIMIT_LOGIN_PER_MIN: int = 10
    RATE_LIMIT_REGISTER_PER_MIN: int = 5
    RATE_LIMIT_REFRESH_PER_MIN: int = 30
    RATE_LIMIT_FORGOT_PER_MIN: int = 3
    RATE_LIMIT_RESET_PER_MIN: int = 10

    PASSWORD_RESET_MINUTES: int = 30

    # The ONE website allowed to call this API from a browser (CORS)
    FRONTEND_ORIGIN: str = "http://localhost:5173"


settings = Settings()

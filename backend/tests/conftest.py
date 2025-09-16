import pytest
import pytest_asyncio
from typing import Any, Dict, Generator, AsyncGenerator
from httpx import AsyncClient, ASGITransport
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, AsyncEngine, async_sessionmaker
from sqlalchemy.pool import StaticPool
import asyncpg  # type: ignore[import-untyped]

from app.core.database import Base, get_session
from app.core.config import settings
from main import app


# Test database URL - use in-memory SQLite for fast tests
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest_asyncio.fixture
async def async_engine() -> AsyncGenerator[AsyncEngine, None]:
    """Create a test database engine."""
    engine = create_async_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield engine

    # Clean up
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

    await engine.dispose()


@pytest_asyncio.fixture
async def async_session(async_engine: AsyncEngine) -> AsyncGenerator[AsyncSession, None]:
    """Create a test database session."""
    async_session_maker = async_sessionmaker(
        async_engine, class_=AsyncSession, expire_on_commit=False
    )

    async with async_session_maker() as session:
        yield session


@pytest.fixture
def override_get_session(async_session: AsyncSession) -> Generator[None, None, None]:
    """Override the database session dependency."""
    async def _override_get_session() -> AsyncGenerator[AsyncSession, None]:
        yield async_session

    app.dependency_overrides[get_session] = _override_get_session
    yield
    app.dependency_overrides.clear()


@pytest.fixture
def client(override_get_session: Any) -> Generator[TestClient, None, None]:
    """Create a test client."""
    with TestClient(app) as test_client:
        yield test_client


@pytest_asyncio.fixture
async def async_client(override_get_session: Any) -> AsyncGenerator[AsyncClient, None]:
    """Create an async test client using ASGI transport."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.fixture
def sample_user_data() -> Dict[str, str]:
    """Sample user data for tests."""
    return {
        "email": "test@example.com",
        "password": "testpassword123",
        "full_name": "Test User"
    }


@pytest.fixture
def sample_user_credentials() -> Dict[str, str]:
    """Sample user credentials for login tests."""
    return {
        "email": "test@example.com",
        "password": "testpassword123"
    }


def pytest_configure(config: Any) -> None:
    """Register custom markers to satisfy --strict-markers."""
    marker_definitions = {
        "unit": "Unit tests",
        "integration": "Integration tests",
        "auth": "Authentication tests",
        "database": "Database tests",
        "slow": "Slow running tests",
    }
    for name, description in marker_definitions.items():
        config.addinivalue_line("markers", f"{name}: {description}")

import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from typing import Dict, Any

router = APIRouter()


@router.get("/build-info")
async def get_build_info() -> Dict[str, Any]:
    """Get build information"""
    build_info_path = Path(__file__).parent.parent.parent / "build-info.json"

    try:
        with open(build_info_path, "r") as f:
            build_info: Dict[str, Any] = json.load(f)
        return build_info
    except FileNotFoundError:
        # Generate basic build info if file doesn't exist
        return {
            "version": "dev",
            "buildNumber": "local",
            "gitCommit": "unknown",
            "gitBranch": "unknown",
            "environment": "development",
            "buildTime": "unknown",
            "service": "backend"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading build info: {str(e)}")
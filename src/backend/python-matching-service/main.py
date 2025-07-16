"""
Author : Huy Le (huyisme-005)
This is the main file for the python-matching algorithm.
"""

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from typing import List
import uvicorn

app = FastAPI()

@app.post("/match")
def match_wardrobe(
    image: UploadFile = File(...),
    country: str = Form(...),
    city: str = Form(...)
):
    # Placeholder: In production, process the image and match with wardrobe DB
    # For now, return dummy data
    matches = [
        {
            "id": 1,
            "name": "Blue Denim Jacket",
            "image_url": "https://example.com/images/denim_jacket.jpg",
            "owner": "user123",
            "region": {"country": country, "city": city}
        },
        {
            "id": 2,
            "name": "Red Flannel Shirt",
            "image_url": "https://example.com/images/flannel_shirt.jpg",
            "owner": "user456",
            "region": {"country": country, "city": city}
        }
    ]
    return JSONResponse(content={"matches": matches})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 
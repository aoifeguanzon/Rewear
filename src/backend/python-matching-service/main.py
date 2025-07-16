"""
Author : Huy Le (huyisme-005)
This is the main file for the python-matching algorithm.

This service uses OpenAI's CLIP model (openai/clip-vit-base-patch16) from HuggingFace to extract image embeddings for wardrobe matching.
"""

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from typing import List
import uvicorn
from PIL import Image
import io

# Import CLIP model and processor from HuggingFace Transformers
# Purpose: CLIP is a state-of-the-art model for extracting semantic image (and text) embeddings.
# We'll use it to convert wardrobe images into feature vectors for similarity search.
from transformers import CLIPProcessor, CLIPModel
import torch

# Load the CLIP model and processor
# This may take a few seconds on first run as it downloads weights from HuggingFace.
# Debugging tip: If you get a download error, check your internet connection or HuggingFace cache.
clip_model_name = "openai/clip-vit-base-patch16"
try:
    clip_model = CLIPModel.from_pretrained(clip_model_name)
    clip_processor = CLIPProcessor.from_pretrained(clip_model_name)
except Exception as e:
    # Debugging tip: If you see an OSError, try clearing the HuggingFace cache or updating transformers.
    raise RuntimeError(f"Failed to load CLIP model: {e}")

app = FastAPI()

@app.post("/match")
def match_wardrobe(
    image: UploadFile = File(...),
    country: str = Form(...),
    city: str = Form(...)
):
    try:
        # Read the uploaded image file into memory
        image_bytes = image.file.read()
        pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Preprocess the image for CLIP
        # Purpose: The processor resizes, normalizes, and converts the image to a tensor
        inputs = clip_processor(images=pil_image, return_tensors="pt")

        # Extract the image embedding using CLIP
        # Purpose: get_image_features returns a high-dimensional vector representing the image's content
        with torch.no_grad():
            image_features = clip_model.get_image_features(**inputs)

        # Convert the embedding tensor to a list for easier debugging/inspection
        embedding_list = image_features[0].cpu().tolist()

        # Debugging tip: If you get a CUDA error, ensure torch is installed with GPU support or use CPU only.
        # For production, compare this embedding to those in your wardrobe database.

        return JSONResponse(content={
            "embedding": embedding_list,
            "country": country,
            "city": city,
            "message": "Image embedding extracted successfully. Compare this to your wardrobe DB for matching."
        })
    except Exception as e:
        # Debugging tip: If you see PIL errors, check the uploaded file is a valid image.
        return JSONResponse(status_code=500, content={
            "error": str(e),
            "message": "Failed to process image. Ensure the file is a valid image and model dependencies are installed."
        })

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 
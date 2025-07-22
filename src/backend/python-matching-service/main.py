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
import json
import os
import math
import itertools

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
        inputs = clip_processor(images=pil_image, return_tensors="pt")

        # Extract the image embedding using CLIP
        with torch.no_grad():
            image_features = clip_model.get_image_features(**inputs)
        user_embedding = image_features[0].cpu().tolist()

        # --- DEMO RECOMMENDATION LOGIC ---
        # 1. Load mock dataset
        db_path = os.path.join(os.path.dirname(__file__), "mock_clothing_db.json")
        with open(db_path, "r") as f:
            clothing_db = json.load(f)

        # 2. Compute similarity (cosine similarity)
        def cosine_similarity(a, b):
            dot = sum(x*y for x, y in zip(a, b))
            norm_a = math.sqrt(sum(x*x for x in a))
            norm_b = math.sqrt(sum(y*y for y in b))
            return dot / (norm_a * norm_b + 1e-8)

        for item in clothing_db:
            item["similarity"] = cosine_similarity(user_embedding, item["embedding"])

        # 3. Sort items by similarity (descending)
        clothing_db.sort(key=lambda x: x["similarity"], reverse=True)

        # 4. Group by category and take top-N per category
        categories = ["top", "bottom", "shoes"]
        top_n = 5
        items_by_cat = {cat: [item for item in clothing_db if item["category"] == cat][:top_n] for cat in categories}

        # 5. Generate all possible outfit combinations (one from each category)
        outfit_combos = list(itertools.product(*[items_by_cat[cat] for cat in categories]))

        # 6. Score each outfit (simple rule: sum of similarities + bonus if all items are same color)
        def score_outfit(outfit):
            sim_sum = sum(item["similarity"] for item in outfit)
            colors = set(item["color"] for item in outfit)
            bonus = 1.0 if len(colors) == 1 else 0.0
            return sim_sum + bonus

        scored_outfits = [
            {"outfit": [
                {"id": item["id"], "name": item["name"], "category": item["category"], "color": item["color"], "similarity": item["similarity"]}
                for item in combo
            ], "score": score_outfit(combo)}
            for combo in outfit_combos
        ]
        scored_outfits.sort(key=lambda x: x["score"], reverse=True)
        top_outfits = scored_outfits[:3]

        return JSONResponse(content={
            "recommendations": top_outfits,
            "country": country,
            "city": city,
            "message": "Top outfit recommendations generated successfully."
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "error": str(e),
            "message": "Failed to process image or generate recommendations."
        })

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 
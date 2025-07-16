# Wardrobe Image Matching Service

This Python FastAPI service matches user-uploaded wardrobe images to secondhand items in the selected region (country, city).

## Setup

1. (Optional) Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

## Running the Service

Start the FastAPI server:
```sh
uvicorn main:app --reload
```

## API

### POST /match
- **Description:** Match an uploaded wardrobe image to secondhand items in the specified region.
- **Request:**
  - `image`: file (form-data)
  - `country`: string (form-data)
  - `city`: string (form-data)
- **Response:**
  - `matches`: List of matching wardrobe items (dummy data for now)

## Integration
This service is called by the Node.js backend route `/api/match-wardrobe`. 
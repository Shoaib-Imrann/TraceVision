TraceVision is a real-time object detection and logging system that captures, processes, and stores detected objects' details.

## 🚀 Tech Stack
- **Frontend:** React
- **Backend:** Express.js (Node.js), Flask (Python)
- **Database:** MongoDB
- **Image Hosting:** Cloudinary

## 📌 Features
- Real-time webcam feed for detection
- Flask-based object detection
- Logs storage in MongoDB
- Image hosting via Cloudinary

## ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

## 2️⃣ Setup Flask

```bash
cd backend
```

### 1. Create a virtual environment (optional):
```bash
python -m venv venv
```

### 2. Activate the virtual environment:
Windows:
```bash
python -m venv venv
```

Mac/Linux:
```bash
source venv/bin/activate
```


### 3. Install dependencies:

```bash
pip install -r requirements.txt
```

### 4. Run Flask:
```bash
python app.py
```


## 3️⃣ Setup Express Backend
```bash
cd backend
npm install
```

### 1. Run the Express server:
```bash
npm run server
```

## 4️⃣ Setup React Frontend

### 1. Open integrated terminal in the frontend directory:
```bash
cd frontend
npm install
```

### 1. Start frontend:
```bash
npm run dev
```

### 5️⃣ Set up environment variables

Create a `.env` file in the backend directory and enter your configuration details.

```bash
MONGODB_URI = ""

JWT_SECRET = ""

CLOUDINARY_API_KEY = ""
CLOUDINARY_SECRET_KEY = ""
CLOUDINARY_NAME = ""
```
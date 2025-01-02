import requests
import os
import cv2
from flask import Flask, render_template, Response, request, jsonify
from ultralytics import YOLO
import time
import colorsys
from datetime import datetime
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load YOLO model
model = YOLO('yolov9t')  # Ensure this path is correct to your YOLO model

# Initialize webcam capture (but don't start it until frontend asks)
cap = None

# List to store logs
logs = []

# HSV Color Ranges
COLOR_RANGES = {
    "red": [(0, 50, 50), (10, 255, 255)],
    "orange": [(11, 50, 50), (25, 255, 255)],
    "yellow": [(26, 50, 50), (35, 255, 255)],
    "green": [(36, 50, 50), (85, 255, 255)],
    "blue": [(86, 50, 50), (135, 255, 255)],
    "purple": [(136, 50, 50), (160, 255, 255)],
    "pink": [(161, 50, 50), (180, 255, 255)],
    "gray": [(0, 0, 30), (180, 50, 150)],
    "black": [(0, 0, 0), (180, 255, 30)],
    "white": [(0, 0, 200), (180, 50, 255)],
}

# Detect Color from HSV
def detect_color_hsv(rgb_color):
    hsv_color = colorsys.rgb_to_hsv(rgb_color[0] / 255, rgb_color[1] / 255, rgb_color[2] / 255)
    h, s, v = int(hsv_color[0] * 180), int(hsv_color[1] * 255), int(hsv_color[2] * 255)
    for color_name, (lower, upper) in COLOR_RANGES.items():
        if all(lower[i] <= (h, s, v)[i] <= upper[i] for i in range(3)):
            return color_name
    return "unknown"

# Send Log to External API (Node.js)
def send_log_to_external_api(person_id, image_file, top_color, bottom_color, event, timestamp):
    try:
        payload = {
            "person_id": person_id,
            "image": image_file,
            "top_color": top_color,
            "bottom_color": bottom_color,
            "event": event,
            "timestamp": timestamp
        }
        response = requests.post('http://localhost:4000/api/logs/store_log', json=payload)
        if response.status_code == 200:
            print(f"Log for {person_id} sent successfully to Node.js API.")
        else:
            print(f"Failed to send log. Status code: {response.status_code}")
            print(f"Response: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Error while sending log: {e}")

# Frame Generation for Webcam
def gen_frames():
    global cap
    person_data = {}  # Dictionary to track detected persons

    while True:
        if cap is None or not cap.isOpened():
            print("Error: Webcam not opened.")
            break
        
        success, frame = cap.read()
        if not success:
            break

        # YOLO Detection
        results = model(frame)
        detections = results[0].boxes.xyxy.cpu().numpy()

        for i, detection in enumerate(detections):
            x1, y1, x2, y2 = map(int, detection[:4])
            person_id = f"Person_{i+1}"
            crop_img = frame[y1:y2, x1:x2]
            height = y2 - y1

            # Split bounding box into top and bottom halves
            top_half = crop_img[: height // 2, :]
            bottom_half = crop_img[height // 2 :, :]

            # Get average colors
            top_color = detect_color_hsv(top_half.mean(axis=(0, 1)).astype(int))
            bottom_color = detect_color_hsv(bottom_half.mean(axis=(0, 1)).astype(int))

            # Assign Entry or Update Label
            if person_id not in person_data:
                # First Detection - Save Image
                timestamp = datetime.now().strftime("%Y-%m-%d %I:%M:%S %p")  # 12-hour format
                image_filename = f"uploads/{person_id}.jpg"
                os.makedirs('uploads', exist_ok=True)  # Ensure uploads directory exists
                cv2.imwrite(image_filename, crop_img)

                # Send data to Node.js API without storing in MongoDB
                send_log_to_external_api(person_id, image_filename, top_color, bottom_color, "Entered", timestamp)
                person_data[person_id] = {"last_seen": time.time(), "in_frame": True}

            # Update person_data if already detected
            person_data[person_id]["last_seen"] = time.time()

            # Draw bounding box and text
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                frame,
                f"{person_id}: Top-{top_color}, Bottom-{bottom_color}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (255, 255, 255),
                2,
            )

        # Check for persons who have left the frame
        for person_id, data in list(person_data.items()):
            if time.time() - data["last_seen"] > 1:  # If 10 seconds without detection
                if data["in_frame"]:
                    timestamp = datetime.now().strftime("%Y-%m-%d %I:%M:%S %p")
                    print(f"Person {person_id} left the frame!")  # Debug log
                    send_log_to_external_api(person_id, "", "", "", "Left", timestamp)
                    person_data[person_id]["in_frame"] = False
                    logs.append({
                        "person_id": person_id,
                        "event": "Left",
                        "timestamp": timestamp
                    })

        # Encode the frame and yield for display
        _, buffer = cv2.imencode(".jpg", frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/start_detection", methods=["POST"])
def start_detection():
    global cap
    if cap is None or not cap.isOpened():
        cap = cv2.VideoCapture(0)  # Initialize webcam when detection starts
        if not cap.isOpened():
            return {"message": "Error: Could not open webcam."}, 500
    print("Detection started.")
    return {"message": "Detection started."}

@app.route("/stop_detection", methods=["POST"])
def stop_detection():
    global cap
    if cap is not None and cap.isOpened():
        cap.release()  # Release the webcam
        cap = None
        print("Detection stopped.")
    return {"message": "Detection stopped."}

# Endpoint to get logs
@app.route('/get_logs', methods=["GET"])
def get_logs():
    return jsonify(logs)  # Return the logs as a JSON response

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

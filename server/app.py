import os
from flask import Flask, request
from flask_cors import CORS
import requests
from shapely.geometry import LineString, Point
import polyline
import concurrent.futures
from camera import Camera
from detection import detect_from_video

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/cameras", methods=["POST"])
def get_cameras_from_geometry():
    body: dict = request.get_json()
    geometry = body.get("geometry", None)
    
    if geometry is None:
        return {"error": "No geometry provided"}, 400
    
    path = LineString(polyline.decode(geometry))
    
    r = requests.get(f"https://511ga.org/api/v2/get/cameras?key={os.getenv('GDOT_API_KEY')}")
    cameras: list[Camera] = r.json()
    
    cams: list[Camera] = []
    for camera in cameras:
        point = Point(camera["Latitude"], camera["Longitude"])
        if camera["Status"] == "Enabled" and camera["VideoUrl"] is not None and path.distance(point) < 0.001:
            cams.append(camera)
    
    print(f"Found {len(cams)} cameras on the given route")
    
    with concurrent.futures.ProcessPoolExecutor() as executor:
        cams = list(executor.map(detect_from_video, cams))
        
    return cams
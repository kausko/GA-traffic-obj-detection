# Object Detection on Live Georgia Traffic Camera Feeds

This is a proof-of-concept for our final project for CS 6476: Computer Vision - Spring '24 at Georgia Tech. It is a web application that uses object detection to detect vehicles in live traffic camera feeds from 511GA/Georgia Department of Transportation (GDOT). The application is built using Flask, YOLOv8, PyAv and PIL in the backend and Vanilla TypeScript and Mapbox GL JS in the frontend. For background work (fine-tuned models), check out [this repository](https://github.com/AishwaryaVS/Trafficsurveillance).

https://github.com/kausko/GA-traffic-obj-detection/assets/53346282/28f450fc-e2a3-41cb-b5b3-76739a2dd507

## Installation

### Server
```bash
cd server
python3 -m venv venv
source venv/bin/activate # for windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Client
```bash
cd client
npm install
```

## Running the Application

### Server
Create a `.env` file in the `server` directory with the following contents:
```
GDOT_API_KEY=<your-api-key>
```

and then run the following commands:

```bash
cd server
source venv/bin/activate # for windows: venv\Scripts\activate
flask run # --debug for auto-reload
```

### Client
Create a `.env` file in the `client` directory with the following contents:
```
VITE_MAPBOX_KEY=<your-mapbox-key>
```

and then run the following commands:

```bash
cd client
npm run dev
```

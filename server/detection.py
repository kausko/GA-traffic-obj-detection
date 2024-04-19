import base64
from ultralytics import YOLO
from ultralytics.models.yolo.model import Model
from camera import Camera
from PIL import Image
from io import BytesIO
import av

# yolo_8: Model = YOLO()
model: Model = YOLO("best.pt")

def detect_from_video(camera: Camera):
    
    try:
        container = av.open(camera["VideoUrl"], timeout=1)
        frame = next(container.decode(video=0)).to_image() # PIL Image
    except Exception as e:
        camera["count"] = -1
        return camera
    
    # result = yolo_8(frame, verbose=False, classes=[2, 3, 5, 7])
    result = model(frame, verbose=False)
    count = result[0].boxes.shape[0]
    img = Image.fromarray(result[0].plot(pil=True))
    bi = BytesIO()
    img.save(bi, format="webp")
    bi.seek(0)
    camera["Url"] = (bytes("data:image/webp;base64,", "utf-8") + base64.b64encode(bi.getvalue())).decode("utf-8")
    camera["count"] = count
    return camera
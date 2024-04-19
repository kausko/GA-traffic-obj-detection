# from operator import itemgetter
# import torch
# from torchvision.models.detection import fasterrcnn_resnet50_fpn
# from torchvision.transforms.functional import to_tensor
# from PIL import Image, ImageDraw

# device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")

# model = fasterrcnn_resnet50_fpn()
# model.load_state_dict(torch.load("model_epoch_10.pth", map_location=device))

# # test image
# img = Image.open("test.jpg").convert("RGB")

# model.eval()
# with torch.no_grad():
#     output = model([to_tensor(img).to(device)])[0]

# boxes, labels, scores = itemgetter("boxes", "labels", "scores")(output)

# output_img = img.copy()
# draw = ImageDraw.Draw(output_img)

# for box, label, score in zip(boxes, labels, scores):
#     if score > 0.5:
#         draw.rectangle(box.tolist(), outline="red")
#         draw.text((box[0], box[1]), f"{label}", fill="red")
    
# output_img.save("output.png")


from ultralytics import YOLO
from ultralytics.models.yolo.model import Model
from PIL import Image

model: Model = YOLO("best.pt")
img = Image.open("videoframe_1280.png")

output = model(img, verbose=False)
output[0].save("output.png")
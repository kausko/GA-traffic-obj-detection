from typing import Literal, TypedDict

class Camera(TypedDict):
    Id: str
    Organization: str
    RoadwayName: str
    DirectionOfTravel: str
    Latitude: float
    Longitude: float
    Name: str
    Url: str
    VideoUrl: str | None
    Status: Literal["Enabled", "Disabled"]
    Description: str
    SortId: int
    count: int
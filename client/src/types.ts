export interface MapboxDirections {
    code: string
    uuid: string
    waypoints: {
        distance: number
        name: string
        location: [number, number]
    }[]
    routes: {
        distance: number
        duration: number
        geometry: string | {
            coordinates: [number, number][]
            type: string
        }
        legs: {
            via_waypoints: [],
            admins: {
                iso_3166_1: string
                iso_3166_1_alpha3: string
            }[]
            distance: number
            duration: number
            steps: []
            summary: string
            weight: number
        }[]
        weight: number
        weight_name: string
    }[]
}

export interface Camera {
    Description: string
    DirectionOfTravel: string
    Id: string
    Latitude: number
    Longitude: number
    Name: string
    Organization: string
    RoadwayName: string
    SortId: number
    Status: string
    Url: string
    VideoUrl: string
    count: number
}
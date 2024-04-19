import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import './style.css';
import mapboxgl from 'mapbox-gl';
import { Camera, MapboxDirections } from './types';

declare global {
    interface Window {
        MapboxDirections: any
    }
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-84.3962850038447, 33.775582101114864],
    zoom: 12
})

const directions = new window.MapboxDirections({
    accessToken: mapboxgl.accessToken,
    interactive: false,
})

map.addControl(directions, 'top-left')

directions.on('clear', () => {
    if (map.getLayer("cameras"))
        map.removeLayer("cameras")

    if (map.getLayer("cameras-count"))
        map.removeLayer("cameras-count")

    if (map.getSource("cameras"))
        map.removeSource("cameras")
})

directions.on('route', ({ route }: { route: MapboxDirections["routes"] }) => {
    const geometry = route[0].geometry as string

    fetch("http://localhost:5000/cameras", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ geometry })
    })
        .then(response => response.json())
        .then((data: Camera[]) => {

            if (map.getLayer("cameras"))
                map.removeLayer("cameras")

            if (map.getLayer("cameras-count"))
                map.removeLayer("cameras-count")

            if (map.getSource("cameras"))
                map.removeSource("cameras")

            map.addSource("cameras", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: data
                        .filter(camera => camera.count !== -1)
                        .map(camera => ({
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [camera.Longitude, camera.Latitude]
                            },
                            properties: {
                                Name: camera.Name,
                                Url: camera.Url,
                                count: camera.count
                            }
                        }))
                }
            })

            map.addLayer({
                id: "cameras",
                type: "circle",
                source: "cameras",
                paint: {
                    "circle-radius": 12,
                    "circle-color": "green"
                }
            })

            map.addLayer({
                id: "cameras-count",
                type: "symbol",
                source: "cameras",
                layout: {
                    "text-field": "{count}",
                    "text-size": 12,
                },
                paint: {
                    "text-color": "white"
                }
            })

            map.on("click", "cameras", (e) => {

                if (!e.features?.[0]?.properties)
                    return

                const { Name, Url } = e.features[0].properties as Camera

                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`
                        <h3>${Name}</h3>
                        <img src="${Url}" />
                    `)
                    .addTo(map)
            })
        })
})

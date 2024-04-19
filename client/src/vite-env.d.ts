/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MAPBOX_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// declare module '@mapbox/mapbox-gl-directions' {
//     export default MapBoxDirections as any
// }

import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";
export default mapboxgl;

const historicData = {

    "200BC": [
        {
            "empire": "",
            "stateName": "",
            "coordinates": [], // should contains all the coordinates of boundaries
            "area": "", // in km
    
        },

    ]

}
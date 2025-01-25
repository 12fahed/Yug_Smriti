"use client"

import type React from "react"
import { useState, useEffect } from "react"
import mapboxgl from "@/lib/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { fetchFromGenAI } from "@/lib/genAIClient"
import { SchemaType } from "@google/generative-ai"
import InfoCard from "./Info-Card"
import { Button } from "@/components/ui/button"

const generateYearRange = (startYear: number, endYear: number, gap: number) => {
  const years = []
  for (let year = startYear; year <= endYear; year += gap) {
    years.push(year)
  }
  return years
}

const MapWithRegions: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [gap, setGap] = useState<number>(1) // Initial gap between years (1 year)
  const [historicEvents, setHistoricEvents] = useState<any[]>([])
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null)
  const [isScanningMap, setIsScanningMap] = useState(false)

  const yearRange = generateYearRange(-2000, 2025, gap)

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setGap((prev) => Math.min(prev + 1, 100)) // Max gap of 5 years
    } else {
      setGap((prev) => Math.max(prev - 1, 1)) // Min gap of 1 year
    }
  }

  const handleYearClick = (year: number) => {
    setSelectedYear(year)
    console.log("Selected Year:", year)
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      // style: "mapbox://styles/cosmicraptor/cm67xg2ub00ic01qsarmtafbp",
      style: "mapbox://styles/cosmicraptor/cm6bd5exy005u01s2ci3r3zwv",
      center: [78.9629, 20.5937],
      zoom: 4,
      interactive: true,
    })

    map.on("load", () => {
      setMapInstance(map)
    })

    return () => {
      map.remove()
    }
  }, [])

  const fetchCountriesInViewport = async (map: mapboxgl.Map) => {
    const bounds = map.getBounds()
    const sw = bounds?.getSouthWest()
    const ne = bounds?.getNorthEast()

    const visibleCoordinates = {
      southwest: {
        longitude: sw?.lng,
        latitude: sw?.lat,
      },
      northeast: {
        longitude: ne?.lng,
        latitude: ne?.lat,
      },
    }

    console.log("Visible coordinates in the viewport:", visibleCoordinates)

    const schema = {
      description: "List of countries within a bounding box",
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description: "Name of a country",
      },
    }

    const prompt = `What countries lie in the bounds with coordinates: SW(${visibleCoordinates.southwest.longitude}, ${visibleCoordinates.southwest.latitude}), NE(${visibleCoordinates.northeast.longitude}, ${visibleCoordinates.northeast.latitude})?`

    try {
      const countries = await fetchFromGenAI(schema, prompt)
      console.log("Countries in visible region:", countries)

      const noOfCountries = Math.ceil(0.75 * countries.length)

      const randomCountries = getRandomElements(countries, noOfCountries)

      const historicDataArray = []
      for (const country of randomCountries) {
        const yearToQuery = selectedYear ?? 1530

        const historicMomentSchema = {
          type: "object",
          properties: {
            country: { type: "string" },
            longitudeCoordinate: { type: "string" },
            latitudeCoordinate: { type: "string" },
            year: { type: "number" },
            event: { type: "string" },
            significance: { type: "string" },
          },
          required: ["country", "year", "event", "significance", "longitudeCoordinate", "latitudeCoordinate"],
        }

        const historicPrompt = `What was the most historic moment in ${country} in the year ${yearToQuery}? Provide a brief description of the event and its significance.`

        try {
          const historicMoment = await fetchFromGenAI(historicMomentSchema, historicPrompt)
          console.log("Historic Moment for", country, ":", historicMoment)
          setHistoricEvents((prevEvents) => [...prevEvents, historicMoment])

          addCardToMap(
            mapInstance,
            country,
            historicMoment.longitudeCoordinate,
            historicMoment.latitudeCoordinate,
            historicMoment,
          )
        } catch (error) {
          console.error(`Error fetching historic moment for ${country}:`, error)
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error)
    }
  }

  const scanMap = async () => {
    if (!mapInstance) return
    setIsScanningMap(true)
    await fetchCountriesInViewport(mapInstance)
    setIsScanningMap(false)
  }

  const getRandomElements = (arr: string[], n: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, n)
  }

  const addCardToMap = (
    mapInstance: mapboxgl.Map,
    country: string,
    longitudeCoordinate: string,
    latitudeCoordinate: string,
    historicMoment: any,
  ) => {
    // Create the popup and add it directly to the map to keep it open
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="popup-card">
          <h2><strong>${country}</strong><h2>
          <h3>${historicMoment.event}</h3>
          <p><strong>Year:</strong> ${historicMoment.year}</p>
          <p><strong>Significance:</strong> ${historicMoment.significance}</p>
        </div>
      `)
      .setLngLat([Number.parseFloat(longitudeCoordinate), Number.parseFloat(latitudeCoordinate)]) // Set popup position
      .addTo(mapInstance) // Immediately add popup to the map (makes it open by default)

    // Add the marker and attach the popup to it
    new mapboxgl.Marker()
      .setLngLat([Number.parseFloat(longitudeCoordinate), Number.parseFloat(latitudeCoordinate)])
      .setPopup(popup) // Attach popup for future interaction
      .addTo(mapInstance) // Add marker to the map
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div id="map" style={{ width: "100%", height: "100%" }} />

      <Button
        onClick={scanMap}
        disabled={isScanningMap || !mapInstance}
        style={{
          position: "absolute",
          bottom: "80px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        {isScanningMap ? "Scanning..." : "Scan Map"}
      </Button>

      <Button
        onClick={() => {
          window.location.href = "/postlogin/FahedMap";
        }}
        disabled={isScanningMap || !mapInstance}
        style={{
          position: "absolute",
          bottom: "150px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        {isScanningMap ? "Redirecting..." : "Change Year"}
      </Button>

      {/* Information Cards Section */}
      {historicEvents?.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "500px",
            height: "100vh",
            overflowY: "auto",
            padding: "20px",
            // backgroundColor: "transparent",
            // boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
          }}
        >
          {historicEvents.map((event, index) => (
            <InfoCard key={index} event={event} />
          ))}
        </div>
      )}

      {/* Timeline Section */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "10px 0",
          backgroundColor: "#fff",
          borderTop: "2px solid #ddd",
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping of items
        }}
        onWheel={handleScroll}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20px",
            paddingRight: "20px",
            cursor: "pointer",
          }}
        >
          {yearRange.map((year) => (
            <div
              key={year}
              style={{
                padding: "5px 10px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedYear === year ? "#d2b386" : "transparent", // Highlight selected year
                color: selectedYear === year ? "white" : "black", // Change text color for selected year
                borderRadius: "8px",
                margin: "0 5px",
                transition: "background-color 0.2s ease",
                display: "inline-block",
              }}
              onClick={() => handleYearClick(year)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = selectedYear === year ? "#d2b386" : "transparent")
              }
            >
              {year < 0 ? `${Math.abs(year)} BC` : year}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MapWithRegions


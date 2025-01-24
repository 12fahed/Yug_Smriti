// EventDetails.tsx
"use client"
import React, { useState, useEffect } from "react";

interface EventDetailsProps {
  event: {
    title: string;
    description: string;
  };
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
  const [details, setDetails] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fullData, setFullData] = useState<string | null>(null);

  useEffect(() => {
    const fetchWikipediaSummary = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(event.title || event.description)}`
        );
        const data = await response.json();

        setDetails(data.extract || "No details available.");
        setImage(data.thumbnail?.source || null);
      } catch (error) {
        console.error("Error fetching Wikipedia summary:", error);
        setDetails("Error fetching details.");
      }
    };

    fetchWikipediaSummary();
  }, [event]);

  const fetchFullWikipediaData = async () => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(event.title || event.description)}`
      );
      const data = await response.text();

      setFullData(data);
    } catch (error) {
      console.error("Error fetching full Wikipedia data:", error);
      setFullData("Error fetching full data.");
    }
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-[100%] relative flex">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          Close
        </button>
        <div className="flex items-center">
          {image && (
            <img
              src={image}
              alt={event.title}
              className="w-40 h-40 object-cover rounded mr-4"
            />
          )}
          <div>
            <h2 className="text-xl font-bold mb-4">{event.title}</h2>
            {fullData ? (
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: fullData }} />
            ) : (
              <p className="text-gray-700">{details}</p>
            )}
            {!fullData && (
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={fetchFullWikipediaData}
              >
                Show More Info
              </button>
            )}
          </div>
        </div>
      </div>
  
  );
};

export default EventDetails;
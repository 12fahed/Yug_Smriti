import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Globe with no SSR
const Globe = dynamic(() => import('./Globe'), { ssr: false });

const Search = ({ onSelectEvent, setShowGlobe }: { 
  onSelectEvent: (event: string) => void,
  setShowGlobe: (show: boolean) => void 
}) => {
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<string[]>([]);

  const eventsList = [
    "1857_Indian_Rebellion",
    "Formation_of_Indian_National_Congress",
    "Partition_of_Bengal",
    "Jallianwala_Bagh_Massacre",
    "Non_Cooperation_Movement",
    "Salt_March",
    "Quit_India_Movement",
    "Indian_Independence",
    "Partition_of_India",
    "First_General_Elections",
    "Indian_Constitution_Adopted",
    "Indo_China_War",
    "Indo_Pakistan_War",
    "Emergency",
    "Operation_Blue_Star",
    "Bhopal_Gas_Tragedy",
    "Ayodhya_Dispute_and_Babri_Masjid_Demolition",
    "Kargil_War",
    "Nuclear_Tests_in_Pokhran",
    "Formation_of_GST"
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      const filtered = eventsList.filter((event) =>
        event.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  };

  const handleSelectEvent = (event: string) => {
    setShowGlobe(true); // Show globe when event is selected
    onSelectEvent(event);
    setQuery(event.replace(/_/g, " "));
    setFilteredEvents([]);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a historical event..."
          className="w-full px-4 py-2 pr-10 border rounded-lg shadow-md focus:outline-none focus:ring-2"
          style={{ 
            borderColor: '#D4AF37',
            backgroundColor: '#FFF8DC',
            color: '#2C1810'
          }}
        />
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{ color: '#8B4513' }}
        >
          <SearchIcon size={20} />
        </div>
      </div>
      {filteredEvents.length > 0 && (
        <ul 
          className="absolute z-10 top-12 left-0 w-full max-h-48 overflow-y-auto border rounded-lg shadow-lg"
          style={{ backgroundColor: '#FFF8DC', borderColor: '#D4AF37' }}
        >
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer transition duration-200 hover:bg-[#F5E6D3]"
              style={{ color: '#2C1810' }}
              onClick={() => handleSelectEvent(event)}
            >
              {event.replace(/_/g, " ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
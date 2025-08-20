'use client';

import { useState } from 'react';
import ItineraryDisplay from './components/ItineraryDisplay';

export default function Home() {
  const [showItinerary, setShowItinerary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGenerateItinerary = () => {
    if (searchQuery.trim()) {
      setShowItinerary(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
      <div className="max-w-2xl w-full space-y-8 mt-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Travel Agent
          </h1>
          <h2 className="text-xl text-gray-600 mb-8">
            Your intelligent partner for group travel
          </h2>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g., Best spots in Paris on a budget"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleGenerateItinerary}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Generate Itinerary
          </button>
        </div>
      </div>

      <div className="w-full mt-12">
        <ItineraryDisplay
          isVisible={showItinerary}
          title="Your Paris Adventure"
          summary="A budget-friendly exploration of the City of Light"
          days={[
            {
              dayNumber: 1,
              activities: [
                'Morning: Visit the Eiffel Tower early to avoid crowds',
                'Afternoon: Picnic lunch at Champ de Mars',
                'Evening: Seine River walk and street food dinner'
              ]
            }
          ]}
        />
      </div>
    </main>
  );
}

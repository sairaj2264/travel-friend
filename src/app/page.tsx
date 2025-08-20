'use client';

import { useState } from 'react';
import ItineraryDisplay from './components/ItineraryDisplay';

interface ItineraryData {
  tripTitle: string;
  tripSummary: string;
  days: Array<{
    dayNumber: number;
    dayTitle: string;
    activities: Array<{
      time: string;
      description: string;
    }>;
  }>;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
  const [error, setError] = useState('');

  const handleGenerateItinerary = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a destination or travel idea');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: searchQuery,
          prompt: `Generate a 3-day itinerary for ${searchQuery}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      setItineraryData(data);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
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
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            onClick={handleGenerateItinerary}
            disabled={isLoading}
            className={`px-8 py-3 bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? 'Generating...' : 'Generate Itinerary'}
          </button>
        </div>
      </div>

      <div className="w-full mt-12">
        <ItineraryDisplay
          isVisible={!!itineraryData}
          tripTitle={itineraryData?.tripTitle}
          tripSummary={itineraryData?.tripSummary}
          days={itineraryData?.days}
        />
      </div>
    </main>
  );
}

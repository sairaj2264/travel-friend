import { NextResponse } from 'next/server';

interface Activity {
  time: string;
  description: string;
}

interface DayItinerary {
  dayNumber: number;
  dayTitle: string;
  activities: Activity[];
}

interface ItineraryResponse {
  tripTitle: string;
  tripSummary: string;
  days: DayItinerary[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destination, prompt } = body;

    if (!destination || !prompt) {
      return NextResponse.json(
        { error: 'Destination and prompt are required' },
        { status: 400 }
      );
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response data
    const mockItinerary: ItineraryResponse = {
      tripTitle: `${destination} Adventure: 3 Days of Exploration`,
      tripSummary: `Experience the best of ${destination} with this carefully curated 3-day itinerary, designed to combine popular attractions with local hidden gems.`,
      days: [
        {
          dayNumber: 1,
          dayTitle: 'Cultural Immersion',
          activities: [
            {
              time: '09:00 AM',
              description: 'Start with a guided walking tour of the historic district'
            },
            {
              time: '12:30 PM',
              description: 'Local cuisine tasting at the central market'
            },
            {
              time: '03:00 PM',
              description: 'Visit to main cultural museums and galleries'
            },
            {
              time: '07:00 PM',
              description: 'Traditional dinner and evening entertainment'
            }
          ]
        },
        {
          dayNumber: 2,
          dayTitle: 'Nature and Adventure',
          activities: [
            {
              time: '08:00 AM',
              description: 'Morning hike to scenic viewpoints'
            },
            {
              time: '11:30 AM',
              description: 'Picnic lunch in the park'
            },
            {
              time: '02:00 PM',
              description: 'Afternoon outdoor activities and sightseeing'
            },
            {
              time: '06:30 PM',
              description: 'Sunset dinner at a rooftop restaurant'
            }
          ]
        },
        {
          dayNumber: 3,
          dayTitle: 'Local Life and Relaxation',
          activities: [
            {
              time: '10:00 AM',
              description: 'Browse local artisan shops and boutiques'
            },
            {
              time: '01:00 PM',
              description: 'Cooking class with local chef'
            },
            {
              time: '04:00 PM',
              description: 'Spa treatment and relaxation time'
            },
            {
              time: '08:00 PM',
              description: 'Farewell dinner at a premium local restaurant'
            }
          ]
        }
      ]
    };

    return NextResponse.json(mockItinerary);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}
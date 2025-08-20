'use client';

interface Activity {
  time: string;
  description: string;
}

interface DayItinerary {
  dayNumber: number;
  dayTitle: string;
  activities: Activity[];
}

interface ItineraryDisplayProps {
  tripTitle?: string;
  tripSummary?: string;
  days?: DayItinerary[];
  isVisible?: boolean;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  tripTitle = 'Your Trip Itinerary',
  tripSummary = 'Explore and enjoy your carefully planned journey.',
  days = [],
  isVisible = false,
}) => {
  if (!isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{tripTitle}</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <p className="text-gray-600 italic">{tripSummary}</p>
      </div>

      <div className="space-y-8">
        {days.length > 0 ? (
          days.map(({ dayNumber, dayTitle, activities }) => (
            <div key={dayNumber} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Day {dayNumber}: {dayTitle}
              </h3>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-gray-600"
                  >
                    <span className="font-medium min-w-[80px]">{activity.time}</span>
                    <span className="flex-1">{activity.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            Your itinerary will appear here once generated.
          </p>
        )}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
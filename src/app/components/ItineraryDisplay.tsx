'use client';

interface ItineraryDisplayProps {
  title?: string;
  summary?: string;
  days?: Array<{
    dayNumber: number;
    activities: string[];
  }>;
  isVisible?: boolean;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  title = 'Your Trip Itinerary',
  summary = 'Explore and enjoy your carefully planned journey.',
  days = [],
  isVisible = false,
}) => {
  if (!isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <p className="text-gray-600 italic">{summary}</p>
      </div>

      <div className="space-y-6">
        {days.length > 0 ? (
          days.map(({ dayNumber, activities }) => (
            <div key={dayNumber} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Day {dayNumber}
              </h3>
              <ul className="space-y-2">
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    className="text-gray-600 flex items-start"
                  >
                    <span className="w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full flex-shrink-0" />
                    {activity}
                  </li>
                ))}
              </ul>
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
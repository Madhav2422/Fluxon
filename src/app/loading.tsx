export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div className="w-1/3 h-full bg-green-600 animate-pulse"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            Powering Your Digital Growth...
          </p>
        </div>
      </div>
    );
  }
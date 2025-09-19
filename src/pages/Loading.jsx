const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main loading spinner */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="w-24 h-24 border-4 border-purple-200 border-opacity-30 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Inner ring */}
          <div
            className="absolute inset-2 w-16 h-16 border-4 border-blue-200 border-opacity-30 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "2s" }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white mb-2">
            Loading
            <span className="inline-block animate-bounce animation-delay-100">
              .
            </span>
            <span className="inline-block animate-bounce animation-delay-200">
              .
            </span>
            <span className="inline-block animate-bounce animation-delay-300">
              .
            </span>
          </h2>

          <p className="text-purple-200 text-lg opacity-80">
            Please wait while we prepare everything for you
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-gray-700 bg-opacity-50 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 h-full rounded-full animate-pulse bg-size-200 animate-gradient-x"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping animation-delay-3000"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            transform: translateX(-50%);
          }
          50% {
            transform: translateX(50%);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 2s ease-in-out infinite;
        }

        .bg-size-200 {
          background-size: 200% 100%;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
};

export default Loading;

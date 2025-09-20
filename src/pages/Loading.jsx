const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-purple-200 border-opacity-30 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div
            className="absolute inset-2 w-16 h-16 border-4 border-blue-200 border-opacity-30 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "2s" }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2 animate-bounce">Loading...</h2>
        <p className="text-purple-200 text-lg opacity-80">Please wait while we prepare everything for you</p>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-50%); }
          50% { transform: translateX(50%); }
        }
        .animate-gradient-x { animation: gradient-x 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Loading;
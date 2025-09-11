const Suggestion = () => {
  const suggestionData = [
    {
      id: 1,
      title: "Ride",
      description: "Go anywhere with Uber. Request a ride, hop in and go.",
      icon: "./ride.png",
    },
    {
      id: 2,
      title: "Reserve",
      description:
        "Reserve your ride in advance so you can relax on the day of your trip.",
      icon: "./reserve.png",
    },
    {
      id: 3,
      title: "Intercity",
      description:
        "Get convenient, affordable outstation cabs anytime at your door.",
      icon: "./intercity.png",
    },
    {
      id: 4,
      title: "Shuttle",
      description:
        "Lower cost shared rides on professionally driven buses and vans.",
      icon: "./shuttle.png",
    },
    {
      id: 5,
      title: "Courier",
      description: "Uber makes same day item delivery easier than ever.",
      icon: "./courier.png",
    },
    {
      id: 6,
      title: "Rentals",
      description:
        "Request a trip for a block of time and make multiple stops.",
      icon: "./rentals.png",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-semibold">Suggestions</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestionData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-gray-100 rounded-2xl p-4 gap-4"
          >
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="flex gap-4">
              <p className="text-sm font-light">{item.description}</p>
              <img
                src={item.icon}
                alt={`${item.title} service icon`}
                className="size-22 object-contain"
              />
            </div>
            <button className="p-2 bg-white rounded-2xl">Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;

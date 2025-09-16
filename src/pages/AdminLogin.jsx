const AdminLogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 bg-zinc-900 rounded-2xl shadow-lg w-[380px] text-white"
      >
        {/* Logo or title */}
        <h1 className="text-center text-3xl font-bold tracking-wide text-white">
          Uber Admin
        </h1>
        <p className="text-center text-gray-400 text-sm">
          Sign in to access your dashboard
        </p>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          required
          className="bg-zinc-800 text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          required
          className="bg-zinc-800 text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
        />

        {/* Login button */}
        <button
          type="submit"
          className="bg-white text-black py-3 rounded-xl font-semibold text-lg hover:bg-gray-200 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-gray-500 text-xs text-center mt-4">
          © {new Date().getFullYear()} Uber Technologies Inc.
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;

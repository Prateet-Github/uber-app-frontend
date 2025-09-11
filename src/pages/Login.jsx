const Login = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="bg-black text-white py-4 text-3xl pl-8">Uber</div>

      <div className="flex flex-col items-center justify-center gap-5 flex-1">
        <h1 className="text-2xl w-xs font-medium">
          What's your phone number or email?
        </h1>

        <input
          type="text"
          placeholder="Enter phone number or email"
          className="bg-gray-300 p-3 w-xs rounded-xl"
        />

        <button className="bg-black text-white w-xs p-3 rounded-xl cursor-pointer">
          Continue
        </button>

        <div className="flex items-center w-xs">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <button className="bg-gray-300 text-black w-xs p-3 rounded-xl cursor-pointer flex items-center justify-center gap-3">
          <img src="./google.svg" alt="google" className="h-6 w-6" />
          <span>Continue with Google</span>
        </button>

        <button className="bg-gray-300 text-black w-xs p-3 rounded-xl cursor-pointer flex items-center justify-center gap-3">
          <img src="./apple.svg" alt="apple" className="h-6 w-6" />
          <span>Continue with Apple</span>
        </button>

        <p className="w-xs font-extralight text-xs text-center">
          By continuing, you agree to calls, including by autodialer, WhatsApp,
          or texts from Uber and its affiliates.
        </p>
      </div>
    </div>
  );
};

export default Login;

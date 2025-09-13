import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (currentState === "Sign Up") {
        console.log("Attempting sign up...");
        await signUp(username, email, password);
        console.log("Sign up successful!");
      } else {
        console.log("Attempting sign in...");
        await signIn(email, password);
        console.log("Sign in successful!");
      }
      console.log("About to navigate to home");
      navigate("/");
    } catch (error) {
      console.error("Auth error:", error.message);
      alert(`Authentication failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithPhoneEmail = () => {
    // For now, just toggle the email form
    // In a real app, this would handle phone number logic
    setShowEmailForm(true);
    setEmail(phoneOrEmail); // Use the input as email for now
  };

  const googleLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:5001/api/users/google";
  };

  const toggleAuthMode = () => {
    setCurrentState(currentState === "Sign Up" ? "Sign In" : "Sign Up");
    // Reset form when switching modes
    setUsername("");
    setEmail("");
    setPassword("");
    setPhoneOrEmail("");
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="bg-black text-white py-4 text-3xl pl-8">Uber</div>

      <div className="flex flex-col items-center justify-center gap-5 flex-1 px-4">
        <h1 className="text-2xl max-w-xs font-medium text-center">
          {!showEmailForm 
            ? "What's your phone number or email?" 
            : `${currentState} to continue`}
        </h1>

        {!showEmailForm ? (
          // Initial phone/email input (Uber-style)
          <>
            <input
              type="text"
              placeholder="Enter phone number or email"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              className="bg-gray-200 p-3 w-full max-w-xs rounded-lg border border-gray-300 focus:border-black focus:outline-none"
            />

            <button
              onClick={handleContinueWithPhoneEmail}
              disabled={!phoneOrEmail.trim()}
              className="bg-black text-white w-full max-w-xs p-3 rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>
          </>
        ) : (
          // Email/Password form
          <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
            {currentState === "Sign Up" && (
              <input
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-gray-200 p-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-200 p-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-200 p-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
            />
            
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white p-3 rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              {loading ? "Loading..." : currentState}
            </button>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="text-blue-600 text-sm hover:underline"
              >
                ← Back
              </button>
              
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-blue-600 text-sm hover:underline"
              >
                {currentState === "Sign Up" ? "Already have an account? Sign In" : "Need an account? Sign Up"}
              </button>
            </div>
          </form>
        )}

        {!showEmailForm && (
          <>
            <div className="flex items-center w-full max-w-xs">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <button
              onClick={googleLogin}
              className="bg-white border border-gray-300 text-black w-full max-w-xs p-3 rounded-lg cursor-pointer flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <img src="./google.svg" alt="google" className="h-6 w-6" />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => setShowEmailForm(true)}
              className="bg-white border border-gray-300 text-black w-full max-w-xs p-3 rounded-lg cursor-pointer flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.333a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Continue with Email</span>
            </button>

            <p className="w-full max-w-xs font-light text-xs text-center text-gray-600 mt-4">
              By continuing, you agree to calls, including by autodialer,
              WhatsApp, or texts from Uber and its affiliates to the number provided.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Helper: safe JSON parse
  const safeParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error("Failed to parse JSON from storage:", value, e);
      return null;
    }
  };

  // ✅ Add updateUser function to sync localStorage
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = safeParse(localStorage.getItem("user"));
    if (token && savedUser) {
      setUser(savedUser);
    }
  }, []);

  const signUp = async (username, email, password) => {
    try {
      const res = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const textResponse = await res.text();
      console.log("Raw response:", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) throw new Error(data.message || "Sign-up failed");

      localStorage.setItem("token", data.token ?? "");
      localStorage.setItem("user", JSON.stringify(data.user ?? null));
      setUser(data.user);

      return data;
    } catch (err) {
      console.error("Sign-up error:", err);
      throw err;
    }
  };

  const signIn = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const textResponse = await res.text();
      console.log("Raw login response:", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token ?? "");
      localStorage.setItem("user", JSON.stringify(data.user ?? null));
      setUser(data.user);

      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    if (user?.role === "admin") {
      window.location.href = "/adminlogin";
    } else if (user?.role === "driver") {
      window.location.href = "/login";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser: updateUser, // ← Add this
      signUp, 
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
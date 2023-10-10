import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <div className="absolute top-6 right-10">
      {!isAuthenticated ? (
        <div>
          <button
            className="text-white bg-blue-800 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        </div>
      ) : (
        <div>
          <p className="text-white inline-block pr-3">Welcome, {user.name}!</p>
          <button
            className="text-white bg-blue-800 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer"
            onClick={() => logout()}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

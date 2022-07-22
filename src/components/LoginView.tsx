import React from "react";
import { signIn } from "next-auth/react";

const LoginView: React.FC = () => {
  return (
    <div>
      <p>Sign in to create a prediction</p>
      <button
        className="btn btn-primary"
        onClick={() => signIn("twitch")}
      >
        Twitch
      </button>
      <button
        className="btn btn-primary"
        onClick={() => signIn("discord")}
      >
        Discord
      </button>
    </div>
  )
};

export default LoginView;

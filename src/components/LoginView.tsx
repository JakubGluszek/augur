import React from "react";
import { signIn } from "next-auth/react";

const LoginView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-evenly">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-lg font-semibold">Hello user!</p>
        <p>If you wish to create an account or sign into an existing one, here are your options.</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-primary w-24"
          onClick={() => signIn("twitch")}
        >
          Twitch
        </button>
        <button
          className="btn btn-primary w-24"
          onClick={() => signIn("discord")}
        >
          Discord
        </button>
      </div>
    </div>
  )
};

export default LoginView;

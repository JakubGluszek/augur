import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import LoginView from "../components/LoginView";
import PredictionsAllPast from "../components/PredictionsAllPast";
import PredictionCreate from "../components/PredictionCreate";
import PredictionsPersonal from "../components/PredictionsPersonal";

const Home: NextPage = () => {
  const { data, status } = useSession();

  return (
    <>
      <Head>
        <title>Augur</title>
        <meta name="description" content="A place for users to place predictions about the future" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-screen-md mx-auto h-fit flex flex-col gap-4 p-2">
        
        <main className="flex flex-col items-center gap-2 p-4 border-2">
          <h1>Augur</h1>
          <p>A place for users to place predictions about the future</p>
        </main>

        {status === "loading"
          ? <div>loading</div>
          : data
            ?
            <div className="flex flex-col items-center gap-4">
              <PredictionCreate />
              <PredictionsPersonal />
            </div>
            : <LoginView />
        }

        <PredictionsAllPast />
      </div>
    </>
  );
};

export default Home;

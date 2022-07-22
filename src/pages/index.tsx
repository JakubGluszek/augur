import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Modal, Tabs } from "@mantine/core";

import PredictionsAllPast from "../components/PredictionsAllPast";
import PredictionsPersonal from "../components/PredictionsPersonal";
import Header from "../components/Header";
import PredictionCreate from "../components/PredictionCreate";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const [viewCreate, setViewCreate] = useState(false);

  return (
    <>
      <Head>
        <title>Augur</title>
        <meta name="description" content="A place for users to place predictions about the future" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        opened={viewCreate}
        onClose={() => setViewCreate(false)}
        title="Place a prediction"
      >
        <PredictionCreate setDisplay={setViewCreate} />
      </Modal>

      <div className="w-full max-w-screen-md mx-auto h-fit flex flex-col gap-4 p-2">
        <Header user={data?.user} />
        <main className="flex flex-col items-center gap-4 p-4 border-[1px] rounded">
          <p>A platform for users to showcase their foreseeing abilities.</p>
          <p>{data ? `${data.user?.name}, ` : "..."}can <span className="font-semibold">You</span> predict a future event?</p>
          <div className={`${!data && "tooltip"}`} data-tip="You must be logged in">
            <button
              className={`btn btn-primary ${!data && "btn-disabled"}`}
              onClick={() => setViewCreate(!viewCreate)}
            >
              Predict
            </button>
          </div>
        </main>

        <Tabs grow variant="unstyled" classNames={{
          root: "rounded",
          tabControl: "rounded",
          tabActive: "bg-primary text-primary-content"
        }}>
          <Tabs.Tab label="All past predictions">
            <PredictionsAllPast />
          </Tabs.Tab>
          {status === "loading"
            ? null
            : data &&
            <Tabs.Tab label="Personal predictions">
              <PredictionsPersonal />
            </Tabs.Tab>
          }
        </Tabs>
      </div>
    </>
  );
};

export default Home;

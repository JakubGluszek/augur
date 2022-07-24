import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Affix, Modal, Tabs, Transition } from "@mantine/core";

import PredictionsAllPast from "../components/PredictionsAllPast";
import PredictionsPersonal from "../components/PredictionsPersonal";
import Header from "../components/Header";
import PredictionCreate from "../components/PredictionCreate";
import { useWindowScroll } from "@mantine/hooks";
import Link from "next/link";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const [viewCreate, setViewCreate] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Head>
        <title>Augur</title>
        <meta name="google-site-verification" content="7QPRR4rGCp-mOw0KEFF5iCeJbiTKEo7POqBwXguUY7c" />
        <meta name="description" content="A platform for users to place predictions about the future" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        opened={viewCreate}
        onClose={() => setViewCreate(false)}
        title="Place a prediction"
      >
        <div className="flex flex-col gap-2">
          <PredictionCreate setDisplay={setViewCreate} />
          <p>It is nearly impossible to predict an event exactly down to the day, but hey, the closer the better!</p>
          <p className="opacity-60">The prediction will become visible to other users on the predicted event day and forever after.</p>
        </div>
      </Modal>

      <div className="w-full max-w-screen-md mx-auto h-fit flex flex-col gap-4 p-2">
        <Header user={data?.user} />

        <main className="flex flex-col items-center gap-4 p-4 bg-base-200 rounded">
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

        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 200}>
            {(transitionStyles) => (
              <button
                className="btn btn-primary"
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Scroll to top
              </button>
            )}
          </Transition>
        </Affix>

        <footer className="bg-base-200 rounded p-2">
          <p>Quick build by Jakub Gluszek</p>
          <p className="link"><Link href="https://github.com/JakubGluszek/augur">Source Code</Link></p>
        </footer>
      </div>
    </>
  );
};

export default Home;

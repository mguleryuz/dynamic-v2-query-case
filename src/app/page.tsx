"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useProviderContext } from "./provider";
import { useAccount, useWalletClient } from "wagmi";
import { useEffect, useState } from "react";

export default function Home() {
  const { count, setCount } = useProviderContext();
  const { isConnected } = useAccount();
  const [isHydrated, setIsHydrated] = useState(false);
  // for debugging purposes / check the react-query-devtools
  useWalletClient();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center gap-10
    "
    >
      {(() => {
        if (!isHydrated) return <h1>Loading...</h1>;

        if (!isConnected) return <DynamicWidget />;

        return <h1>Connected</h1>;
      })()}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Increment count: {count}
      </button>

      <DynamicWidget />
    </div>
  );
}

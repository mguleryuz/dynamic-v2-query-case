"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { createContext, useContext, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type TProviderContext = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const ProviderContext = createContext({} as TProviderContext);

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  // CONTEXT
  //==============================================
  const contextData: TProviderContext = {
    count,
    setCount,
  };

  return (
    <ProviderContext.Provider value={contextData}>
      <DynamicContextProvider
        settings={{
          environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </ProviderContext.Provider>
  );
}

export const useProviderContext = () => useContext(ProviderContext);

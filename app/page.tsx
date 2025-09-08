"use client";

import {
  type SupportedWallet,
  WalletId,
  WalletManager,
  WalletProvider,
} from "@txnlab/use-wallet-react";
import { SnackbarProvider } from "notistack";
import Home from "@/components/Home";
import {
  getAlgodConfigFromEnvironment,
  getKmdConfigFromEnvironment,
} from "@/utils/network/getAlgoClientConfigs";

let supportedWallets: SupportedWallet[];
if (process.env.NEXT_PUBLIC_ALGOD_NETWORK === "localnet") {
  const kmdConfig = getKmdConfigFromEnvironment();
  supportedWallets = [
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ];
} else {
  supportedWallets = [
    { id: WalletId.DEFLY },
    { id: WalletId.PERA },
    { id: WalletId.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ];
}

export default function App() {
  const algodConfig = getAlgodConfigFromEnvironment();

  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: algodConfig.port,
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  });

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider manager={walletManager}>
        <Home />
      </WalletProvider>
    </SnackbarProvider>
  );
}

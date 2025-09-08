// src/components/Home.tsx
"use client";

import { useWallet } from "@txnlab/use-wallet-react";
import { Code, ExternalLink, Send, Wallet } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppCalls from "./AppCalls";
import ConnectWallet from "./ConnectWallet";
import Transact from "./Transact";

const Home: React.FC = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false);
  const { activeAddress } = useWallet();

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal);
  };

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal);
  };

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to AlgoKit
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed">
            This starter has been generated using the official AlgoKit Nextjs 15
            template. Get started building on Algorand!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            data-test-id="getting-started"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
            asChild
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/algorandfoundation/algokit-cli"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Getting Started
            </a>
          </Button>

          <Separator className="my-6" />

          <div className="space-y-3">
            <Button
              data-test-id="connect-wallet"
              variant="outline"
              className="w-full hover:bg-blue-50 border-blue-200 hover:border-blue-300"
              onClick={toggleWalletModal}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Wallet Connection
            </Button>

            {activeAddress && (
              <Button
                data-test-id="transactions-demo"
                variant="outline"
                className="w-full hover:bg-green-50 border-green-200 hover:border-green-300"
                onClick={toggleDemoModal}
              >
                <Send className="w-4 h-4 mr-2" />
                Transactions Demo
              </Button>
            )}

            {activeAddress && (
              <Button
                data-test-id="appcalls-demo"
                variant="outline"
                className="w-full hover:bg-purple-50 border-purple-200 hover:border-purple-300"
                onClick={toggleAppCallsModal}
              >
                <Code className="w-4 h-4 mr-2" />
                Contract Interactions
              </Button>
            )}
          </div>

          <ConnectWallet
            openModal={openWalletModal}
            closeModal={toggleWalletModal}
          />
          <Transact
            openModal={openDemoModal}
            setModalState={setOpenDemoModal}
          />
          <AppCalls
            openModal={appCallsDemoModal}
            setModalState={setAppCallsDemoModal}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

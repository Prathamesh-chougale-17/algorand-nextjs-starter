import { useWallet, type Wallet, WalletId } from "@txnlab/use-wallet-react";
import { LogOut, Wallet as WalletIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Account from "./Account";

interface ConnectWalletInterface {
  openModal: boolean;
  closeModal: () => void;
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { wallets, activeAddress } = useWallet();

  const isKmd = (wallet: Wallet) => wallet.id === WalletId.KMD;

  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            Select Wallet Provider
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to the Algorand network.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {activeAddress && (
            <div className="space-y-4">
              <Account />
              <Separator />
            </div>
          )}

          {!activeAddress && (
            <div className="space-y-2">
              {wallets?.map((wallet) => (
                <Button
                  key={`provider-${wallet.id}`}
                  variant="outline"
                  className="w-full justify-start h-12 hover:bg-blue-50 border-gray-200 hover:border-blue-300"
                  data-test-id={`${wallet.id}-connect`}
                  onClick={() => wallet.connect()}
                >
                  {!isKmd(wallet) && (
                    <Image
                      alt={`${wallet.metadata.name} icon`}
                      src={wallet.metadata.icon}
                      width={24}
                      height={24}
                      className="mr-3 object-contain"
                    />
                  )}
                  {isKmd(wallet) && <WalletIcon className="w-6 h-6 mr-3" />}
                  <span className="font-medium">
                    {isKmd(wallet) ? "LocalNet Wallet" : wallet.metadata.name}
                  </span>
                </Button>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              data-test-id="close-wallet-modal"
              onClick={closeModal}
            >
              Close
            </Button>
            {activeAddress && (
              <Button
                variant="destructive"
                className="flex-1"
                data-test-id="logout"
                onClick={async () => {
                  if (wallets) {
                    const activeWallet = wallets.find((w) => w.isActive);
                    if (activeWallet) {
                      await activeWallet.disconnect();
                    } else {
                      // Required for logout/cleanup of inactive providers
                      localStorage.removeItem("@txnlab/use-wallet:v3");
                      window.location.reload();
                    }
                  }
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ConnectWallet;

import { AlgorandClient, algo } from "@algorandfoundation/algokit-utils";
import { useWallet } from "@txnlab/use-wallet-react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { getAlgodConfigFromViteEnvironment } from "../utils/network/getAlgoClientConfigs";

interface TransactInterface {
  openModal: boolean;
  setModalState: (value: boolean) => void;
}

const Transact = ({ openModal, setModalState }: TransactInterface) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [receiverAddress, setReceiverAddress] = useState<string>("");

  const algodConfig = getAlgodConfigFromViteEnvironment();
  const algorand = AlgorandClient.fromConfig({ algodConfig });

  const { enqueueSnackbar } = useSnackbar();

  const { transactionSigner, activeAddress } = useWallet();

  const handleSubmitAlgo = async () => {
    setLoading(true);

    if (!(transactionSigner && activeAddress)) {
      enqueueSnackbar("Please connect wallet first", { variant: "warning" });
      return;
    }

    try {
      enqueueSnackbar("Sending transaction...", { variant: "info" });
      const result = await algorand.send.payment({
        signer: transactionSigner,
        sender: activeAddress,
        receiver: receiverAddress,
        amount: algo(1),
      });
      enqueueSnackbar(`Transaction sent: ${result.txIds[0]}`, {
        variant: "success",
      });
      setReceiverAddress("");
    } catch (e) {
      enqueueSnackbar("Failed to send transaction", { variant: "error" });
    }

    setLoading(false);
  };

  return (
    <dialog
      className={`modal ${openModal ? "modal-open" : ""} bg-slate-200`}
      id="transact_modal"
      style={{ display: openModal ? "block" : "none" }}
    >
      <form className="modal-box" method="dialog">
        <h3 className="font-bold text-lg">Send payment transaction</h3>
        <br />
        <input
          className="input input-bordered w-full"
          data-test-id="receiver-address"
          onChange={(e) => {
            setReceiverAddress(e.target.value);
          }}
          placeholder="Provide wallet address"
          type="text"
          value={receiverAddress}
        />
        <div className="modal-action grid">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button
            className={`btn ${receiverAddress.length === 58 ? "" : "btn-disabled"} lo`}
            data-test-id="send-algo"
            onClick={handleSubmitAlgo}
          >
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              "Send 1 Algo"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Transact;

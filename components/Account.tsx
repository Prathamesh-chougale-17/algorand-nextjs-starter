import { useWallet } from "@txnlab/use-wallet-react";
import { ExternalLink, Globe, Wallet } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ellipseAddress } from "../utils/ellipseAddress";
import { getAlgodConfigFromEnvironment } from "../utils/network/getAlgoClientConfigs";

const Account = () => {
  const { activeAddress } = useWallet();
  const algoConfig = getAlgodConfigFromEnvironment();

  const networkName = useMemo(() => {
    return algoConfig.network === ""
      ? "localnet"
      : algoConfig.network.toLocaleLowerCase();
  }, [algoConfig.network]);

  const networkColor = useMemo(() => {
    switch (networkName) {
      case "mainnet":
        return "bg-green-100 text-green-800 border-green-200";
      case "testnet":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "localnet":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }, [networkName]);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Connected Account
            </span>
          </div>
          <Badge className={`${networkColor} font-medium`}>
            <Globe className="w-3 h-3 mr-1" />
            {networkName}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <a
            className="text-blue-600 hover:text-blue-800 font-mono text-sm flex items-center gap-1 hover:underline transition-colors"
            href={`https://lora.algokit.io/${networkName}/account/${activeAddress}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ellipseAddress(activeAddress)}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default Account;

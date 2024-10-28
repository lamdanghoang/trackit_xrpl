import { useState, useCallback } from "react";
import { useSDK } from "@metamask/sdk-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Copy, LogOut, ArrowRightFromLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useToast } from "@/hooks/useToast";

const MetamaskWalletButton = () => {
  const [account, setAccount] = useState("");
  const { sdk, connected, connecting } = useSDK();
  const { toast } = useToast();
  const router = useRouter();

  const connect = useCallback(async () => {
    try {
      if (!sdk) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "MetaMask SDK not initialized",
        });
        return;
      }

      const accounts = await sdk.connect();
      if (accounts?.[0]) {
        setAccount(accounts[0]);
        toast({
          title: "Success",
          description: "Wallet connected successfully",
        });
      }
    } catch (err) {
      console.error("Failed to connect:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect wallet. Please try again.",
      });
    }
  }, [sdk, toast]);

  const disconnect = useCallback(async () => {
    try {
      if (sdk) {
        await sdk.terminate();
        setAccount("");
        toast({
          title: "Success",
          description: "Wallet disconnected successfully",
        });
      }
    } catch (err) {
      console.error("Failed to disconnect:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to disconnect wallet",
      });
    }
  }, [sdk, toast]);

  const copyAddress = useCallback(async () => {
    if (!account) return;
    try {
      await navigator.clipboard.writeText(account);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address",
      });
    }
  }, [account, toast]);

  const routerHandler = useCallback(() => {
    router.push("/kana");
  }, [router]);

  return (
    <div className="relative">
      {connected && account ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-lido hover:bg-lido/80 font-bold">
              {`${account.slice(0, 6)}...${account.slice(-5)}`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={routerHandler} className="gap-2">
              <ArrowRightFromLine className="h-4 w-4" /> Kanabot
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={copyAddress} className="gap-2">
              <Copy className="h-4 w-4" /> Copy address
            </DropdownMenuItem>
            {/* {wallet && isAptosConnectWallet(wallet) && (
                    <DropdownMenuItem asChild>
                        <a
                            href={APTOS_CONNECT_ACCOUNT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2"
                        >
                            <User className="h-4 w-4" /> Account
                        </a>
                    </DropdownMenuItem>
                )} */}
            <DropdownMenuItem onSelect={disconnect} className="gap-2">
              <LogOut className="h-4 w-4" /> Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={connect}
          disabled={connecting}
          className="bg-lido hover:bg-lido/80 font-bold"
        >
          {connecting ? "Connecting..." : "Connect a Wallet"}
        </Button>
      )}
    </div>
  );
};

export default MetamaskWalletButton;

// "use client";

// import { Button } from "@/components/ui/Button";
// import { useSDK } from "@metamask/sdk-react";
// import { Copy, LogOut, ArrowRightFromLine } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/DropdownMenu";
// import { useRouter } from "next/navigation";
// import { useCallback, useState } from "react";
// import { useToast } from "@/hooks/useToast";

// export const MetamaskWalletButton = () => {
//   const [account, setAccount] = useState<string | undefined>(
//     "0xFAE5a7E57D7fb6ea30b9c4242a812d4cb1decD74"
//   );
//   const { sdk, connected, connecting } = useSDK();
//   const { toast } = useToast();
//   const router = useRouter();

//   const connect = async () => {
//     try {
//       const accounts = await sdk?.connect();
//       console.log(accounts);
//       setAccount(accounts?.[0]);
//     } catch (err) {
//       console.warn(`failed to connect..`, err);
//     }
//   };

//   const disconnect = async () => {
//     if (sdk) {
//       await sdk.terminate();
//     }
//   };

//   const copyAddress = useCallback(async () => {
//     if (!account) return;
//     try {
//       await navigator.clipboard.writeText(account);
//       toast({
//         title: "Success",
//         description: "Copied wallet address to clipboard.",
//       });
//     } catch {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to copy wallet address.",
//       });
//     }
//   }, [account, toast]);

//   const routerHandler = () => {
//     router.push("/kana");
//   };

//   return (
//     <div className="relative">
//       {connected ? (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button className="bg-lido hover:bg-lido/80 font-bold">
//               {`${account?.slice(0, 6)}...${account?.slice(-5)}`}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onSelect={routerHandler} className="gap-2">
//               <ArrowRightFromLine className="h-4 w-4" /> Kanabot
//             </DropdownMenuItem>
//             <DropdownMenuItem onSelect={copyAddress} className="gap-2">
//               <Copy className="h-4 w-4" /> Copy address
//             </DropdownMenuItem>
//             {/* {wallet && isAptosConnectWallet(wallet) && (
//               <DropdownMenuItem asChild>
//                 <a
//                   href={APTOS_CONNECT_ACCOUNT_URL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex gap-2"
//                 >
//                   <User className="h-4 w-4" /> Account
//                 </a>
//               </DropdownMenuItem>
//             )} */}
//             <DropdownMenuItem onSelect={() => disconnect()} className="gap-2">
//               <LogOut className="h-4 w-4" /> Disconnect
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ) : (
//         <Button
//           disabled={connecting}
//           onClick={connect}
//           className="px-4 py-2 bg-lido hover:bg-lido/80 font-bold text-gray-50 text-sm leading-6 rounded-md"
//         >
//           Connect a Wallet
//         </Button>
//       )}
//     </div>
//   );
// };

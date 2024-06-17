import { getFarcasterUserAddress } from "@coinbase/onchainkit/farcaster";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base, baseSepolia, optimism, optimismSepolia } from "viem/chains";

import InterchainTokenFactoryABI from "../../../_contracts/InterchainTokenFactoryABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

const INTERCHAIN_TOKEN_SERVICE_ADDRESS =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";
const INTERCHAIN_TOKEN_FACTORY_ADDRESS =
  "0x83a93500d23Fbc3e82B410aD07A6a9F7A0670D66";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  try {
    const body = await req.json();
    console.log(body);

    // Decode the URL-encoded serialized state
    let decodedState;
    try {
      decodedState = decodeURIComponent(body.untrustedData.state);
    } catch (error) {
      console.error("Error decoding state:", error);
      return NextResponse.json(
        { error: "Invalid state format" },
        { status: 400 }
      );
    }

    // Parse the decoded state
    let parsedState;
    try {
      parsedState = JSON.parse(decodedState);
    } catch (error) {
      console.error("Error parsing serialized state:", error);
      return NextResponse.json(
        { error: "Invalid serialized state" },
        { status: 400 }
      );
    }

    const tokenDetails = parsedState.data;
    const chainSelected = parsedState.chainSelected;

    // Split the data string
    const [name, symbol, decimals, initialSupply] = tokenDetails.split(",");
    if (!name || !symbol || !decimals || !initialSupply) {
      console.error("Invalid token details:", tokenDetails);
      return NextResponse.json(
        { error: "Invalid token details" },
        { status: 400 }
      );
    }

    const userAddress = await getFarcasterUserAddress(body.untrustedData.fid);
    let custodyAddress: `0x${string}`;

    if (
      userAddress?.custodyAddress &&
      /^0x[0-9a-fA-F]{40}$/.test(userAddress.custodyAddress)
    ) {
      custodyAddress = userAddress.custodyAddress as `0x${string}`;
    } else {
      custodyAddress = "0x0000000000000000000000000000000000000000";
    }

    console.log("User Address: ", custodyAddress);

    const data = encodeFunctionData({
      abi: InterchainTokenFactoryABI,
      functionName: "deployInterchainToken",
      args: [
        "0x", // salt
        name,
        symbol,
        parseInt(decimals),
        BigInt(initialSupply),
        custodyAddress,
      ],
    });

    let txData: FrameTransactionResponse | null = null;

    if (chainSelected === "base") {
      txData = {
        chainId: `eip155:${baseSepolia.id}`,
        method: "eth_sendTransaction",
        params: {
          abi: [],
          data,
          to: INTERCHAIN_TOKEN_FACTORY_ADDRESS,
          value: parseEther("0.00001").toString(),
        },
      };
    } else if (chainSelected === "optimism") {
      txData = {
        chainId: `eip155:${optimismSepolia.id}`,
        method: "eth_sendTransaction",
        params: {
          abi: [],
          data,
          to: INTERCHAIN_TOKEN_FACTORY_ADDRESS,
          value: "0x0",
        },
      };
    }

    if (!txData) {
      return NextResponse.json(
        { error: "Invalid chain selected" },
        { status: 400 }
      );
    }

    return NextResponse.json(txData);
  } catch (error) {
    console.error("Error in getResponse:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

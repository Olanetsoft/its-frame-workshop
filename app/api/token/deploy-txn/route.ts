import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base } from "viem/chains";

import SendMessageABI from "../../../_contracts/SendMessageABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

const INTERCHAIN_TOKEN_SERVICE_ADDRESS =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";
const INTERCHAIN_TOKEN_FACTORY_ADDRESS =
  "0x83a93500d23Fbc3e82B410aD07A6a9F7A0670D66";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body = await req.json();

  console.log(body);

  const [name, symbol, decimals, initialSupply] = body.split(",");

  const data = encodeFunctionData({
    abi: SendMessageABI,
    functionName: "setRemoteValue",
    args: [
      "optimism",
      INTERCHAIN_TOKEN_SERVICE_ADDRESS,
      body.untrustedData.inputText,
    ],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: INTERCHAIN_TOKEN_FACTORY_ADDRESS,
      value: parseEther("0.00001").toString(), // 0.00008 ETH
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "View transaction",
          action: "link",
          target: `https://axelarscan.io/gmp/${body?.untrustedData?.transactionId}`,
        },
        {
          label: "Bridge Token",
          action: "post",
          target: `${process.env.NEXT_PUBLIC_HOST_URL}/api/actions/bridge-token`,
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_HOST_URL}/result-frame.png`,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

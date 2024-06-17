import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Create an Interchain Token",
          // target: `${process.env.NEXT_PUBLIC_HOST_URL}/api/actions/create-token`,
        },
        {
          action: "post",
          label: "Bridge Token",
          // target: `${process.env.NEXT_PUBLIC_HOST_URL}/api/actions/bridge-token`,
        },
      ],
      image: `${process.env.NEXT_PUBLIC_HOST_URL}/images/create.png`,
      postUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/api/middleware/next-event`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

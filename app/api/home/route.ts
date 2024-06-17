import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Create an Interchain Token",
          // target: `https://its-frame-workshop.vercel.app/api/actions/create-token`,
        },
        {
          action: "post",
          label: "Bridge Token",
          // target: `https://its-frame-workshop.vercel.app/api/actions/bridge-token`,
        },
      ],
      image: `https://its-frame-workshop.vercel.app/images/create.png`,
      postUrl: `https://its-frame-workshop.vercel.app/api/middleware/next-event`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

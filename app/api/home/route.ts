import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Create an Interchain Token",
          // target: "http://localhost:3000/api/actions/create-token",
        },
        {
          action: "post",
          label: "Bridge Token",
          // target: "http://localhost:3000/api/actions/bridge-token",
        },
      ],
      image: "http://localhost:3000/images/create.png",
      postUrl: "http://localhost:3000/api/middleware/next-event",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Base",
          target: "http://localhost:3000/api/chains/base",
        },
        {
          action: "post",
          label: "Optimism",
          target: "http://localhost:3000/api/chains/optimism",
        },
      ],

      image: "http://localhost:3000/images/select.png",
      postUrl: "http://localhost:3000/api/middleware/next-event",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

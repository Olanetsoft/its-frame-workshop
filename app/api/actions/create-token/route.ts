import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Base",
          target: `https://its-frame-workshop.vercel.app/api/chains/base`,
        },
        {
          action: "post",
          label: "Optimism",
          target: `https://its-frame-workshop.vercel.app/api/chains/optimism`,
        },
      ],

      image: `https://its-frame-workshop.vercel.app/images/select.png`,
      postUrl: `https://its-frame-workshop.vercel.app/api/middleware/next-event`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

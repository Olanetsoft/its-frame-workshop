import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Base",
          target: `${process.env.NEXT_PUBLIC_HOST_URL}/api/chains/base`,
        },
        {
          action: "post",
          label: "Optimism",
          target: `${process.env.NEXT_PUBLIC_HOST_URL}/api/chains/optimism`,
        },
      ],

      image: `${process.env.NEXT_PUBLIC_HOST_URL}/images/select.png`,
      postUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/api/middleware/next-event`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

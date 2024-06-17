import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Currently inside next-event middleware");
  const c = await req.json();

  console.log(c);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Base",
        },
        {
          action: "post",
          label: "Optimism",
        },
      ],
      image: `${process.env.NEXT_PUBLIC_HOST_URL}/images/create.png`,
      postUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/api/middleware/next-chain`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

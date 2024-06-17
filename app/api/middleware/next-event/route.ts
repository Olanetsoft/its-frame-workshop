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
      image: "http://localhost:3000/images/create.png",
      postUrl: "http://localhost:3000/api/middleware/next-chain",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Currently inside chains/optimism");
  const body = await req.json();
  console.log(body);
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "create on optimism",
          // target: `https://its-frame-workshop.vercel.app/api/actions/create-token`,
        },
      ],
      image: `https://its-frame-workshop.vercel.app/images/create.png`,
      //   postUrl: `https://its-frame-workshop.vercel.app/api/middleware/next-event`,
      state: {
        chainSelected: "optimism",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

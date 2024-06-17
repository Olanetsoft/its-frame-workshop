import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Currently inside chains/base");
  const body = await req.json();
  console.log(body);
  return new NextResponse(
    getFrameHtmlResponse({
      input: {
        text: "Name, Symbol, Decimals, Supply",
      },

      buttons: [
        {
          action: "post",
          label: "Next >>",
        },
      ],
      image: `https://its-frame-workshop.vercel.app/images/create.png`,
      postUrl: `https://its-frame-workshop.vercel.app/api/token/details`,
      state: {
        chainSelected: body.untrustedData.buttonIndex == 1 ? "base" : "none",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

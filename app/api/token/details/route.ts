import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Currently inside token/details");
  const body = await req.json();
  console.log(body);
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `${body.untrustedData.inputText}`,
        },
        {
          action: "tx",
          label: "Deploy",
          target: `https://its-frame-workshop.vercel.app/api/token/deploy-txn`,
          postUrl: `https://its-frame-workshop.vercel.app/api/token/deploy-txn-success`,
        },
      ],
      image: `https://its-frame-workshop.vercel.app/images/create.png`,
      postUrl: `https://its-frame-workshop.vercel.app/api/token/deploy-txn`,
      state: {
        chainSelected: body.untrustedData.buttonIndex == 1 ? "base" : "none",
        data: body.untrustedData.inputText,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

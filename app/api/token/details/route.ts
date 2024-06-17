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
          target: "http://localhost:3000/api/token/deplot-txn",
          postUrl: "http://localhost:3000/api/token/deploy-txn-success",
        },
      ],
      image: "http://localhost:3000/images/create.png",
      postUrl: "http://localhost:3000/api/token/deploy-txn",
      state: {
        chainSelected: body.mockFrameData.button == 1 ? "base" : "none",
        data: body.untrustedData.inputText,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

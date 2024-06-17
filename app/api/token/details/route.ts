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
          action: "post",
          label: "Deploy",
          target: `${process.env.NEXT_PUBLIC_HOST_URL}/api/token/deploy-txn`,
          //   postUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/api/token/deploy-txn-success`,
        },
      ],
      image: `${process.env.NEXT_PUBLIC_HOST_URL}/images/create.png`,
      postUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/api/token/deploy-txn`,
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

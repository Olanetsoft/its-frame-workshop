import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Currently inside chains/base");
  const body = await req.json();
  console.log(body);
  return new NextResponse(
    getFrameHtmlResponse({
      input: {
        text: "Name, Symbol, Decimals, initial Supply",
      },

      buttons: [
        {
          action: "post",
          label: "Next >>",
        },
      ],
      image: "http://localhost:3000/images/create.png",
      postUrl: "http://localhost:3000/api/token/details",
      state: {
        chainSelected: body.mockFrameData.button == 1 ? "base" : "none",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

// import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
// import { NextRequest, NextResponse } from "next/server";

// async function getResponse(req: NextRequest): Promise<NextResponse> {
//   const c = await req.json();

//   console.log(c);
//   return new NextResponse(
//     getFrameHtmlResponse({
//       buttons: [
//         {
//           action: "post",
//           label: "Base",
//         },
//         {
//           action: "post",
//           label: "Optimism",
//         },
//       ],
//       image: `${process.env.NEXT_PUBLIC_HOST_URL}/images/create.png",
//       postUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/api/middleware/next-chain",
//       state: {
//         actionType: c.mockFrameData.button, // button clicked by the user
//         chain: c.mockFrameData.button,
//       },
//     })
//   );
// }

// export async function POST(req: NextRequest): Promise<Response> {
//   return getResponse(req);
// }

import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Currently inside next-chain middleware");
  const c = await req.json();

  let postUrl;
  if (c.mockFrameData.button === 1) {
    postUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/api/chains/base`;
  } else if (c.mockFrameData.button === 2) {
    postUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/api/chains/optimism`;
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Next >>",
        },
      ],
      image: `${process.env.NEXT_PUBLIC_HOST_URL}/images/create.png`,
      postUrl: postUrl,
      // state: {
      //   // actionType: c.mockFrameData.button, // button clicked by the user
      //   chain: c.mockFrameData.button,
      // },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

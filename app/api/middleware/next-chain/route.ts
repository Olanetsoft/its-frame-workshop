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
//       image: `https://its-frame-workshop.vercel.app/images/create.png",
//       postUrl: `https://its-frame-workshop.vercel.app/api/middleware/next-chain",
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
  if (c.untrustedData.buttonIndex === 1) {
    postUrl = `https://its-frame-workshop.vercel.app/api/chains/base`;
  } else if (c.mockFrameData.buttonIndex === 2) {
    postUrl = `https://its-frame-workshop.vercel.app/api/chains/optimism`;
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Next >>",
        },
      ],
      image: `https://its-frame-workshop.vercel.app/images/create.png`,
      postUrl: postUrl,
      // state: {
      //   // actionType: c.untrustedData.buttonIndex, // button clicked by the user
      //   chain: c.untrustedData.buttonIndex,
      // },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

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
//       image: "http://localhost:3000/images/create.png",
//       postUrl: "http://localhost:3000/api/middleware/next-chain",
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
    postUrl = "http://localhost:3000/api/chains/base";
  } else if (c.mockFrameData.button === 2) {
    postUrl = "http://localhost:3000/api/chains/optimism";
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Next >>",
        },
      ],
      image: "http://localhost:3000/images/create.png",
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

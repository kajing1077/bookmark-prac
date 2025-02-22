import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  console.log("=== Naver Disconnect API Called ===");

  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    const accessToken = token?.accessToken as string;
    if (!accessToken) {
      console.log("No access token found");
      return new Response("No token found", { status: 404 });
    }

    // 1. 먼저 토큰 유효성 검사
    console.log("Validating token...");
    const validateResponse = await fetch(
      "https://openapi.naver.com/v1/nid/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!validateResponse.ok) {
      console.log("Token validation failed:", await validateResponse.text());
      return new Response("Invalid token", { status: 401 });
    }

    // 2. 토큰이 유효하면 삭제 요청
    console.log("Token is valid, proceeding with disconnection...");
    const encodedToken = encodeURIComponent(accessToken)
      .replace(/\+/g, "%2B")
      .replace(/\//g, "%2F")
      .replace(/=/g, "%3D");

    const disconnectUrl = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.AUTH_NAVER_ID}&client_secret=${process.env.NAUTH_NAVER_SECRET}&access_token=${encodedToken}&service_provider=NAVER`;

    const disconnectResponse = await fetch(disconnectUrl);
    const disconnectData = await disconnectResponse.json();

    console.log("Naver disconnect response:", disconnectData);

    // 3. 연동 해제 확인
    const verifyResponse = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (verifyResponse.ok) {
      console.log("Warning: Token is still valid after disconnect");
    } else {
      console.log("Success: Token is no longer valid");
    }

    return new Response(JSON.stringify(disconnectData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in naver-disconnect:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

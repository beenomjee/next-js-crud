import { authMiddleware } from "@/utils";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const GET = authMiddleware(async () => {
  try {
    const serializeToken = serialize("token", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date("01-01-1970"),
    });
    return NextResponse.json(
      {
        message: "Logged out!",
      },
      {
        status: 200,
        headers: { "Set-Cookie": serializeToken },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong. Please try again!",
      },
      {
        status: 500,
      }
    );
  }
});

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

const authMiddleware = (cb) => async (req, context) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token?.value)
      return new NextResponse(
        JSON.stringify({
          message: "Token not found!",
        }),
        {
          status: 400,
        }
      );

    const signature = jwt.verify(token.value, process.env.SECRET_KEY);
    req.userId = signature;
    return cb(req, context);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      const serializeToken = serialize("token", "", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        expires: new Date("01-01-1970"),
      });
      return NextResponse.json(
        {
          message: "Invalid token!",
          error,
        },
        {
          status: 400,
          headers: { "Set-Cookie": serializeToken },
        }
      );
    }

    return NextResponse.json(
      {
        message: "Something went wrong. Please try again!",
        error,
      },
      {
        status: 500,
      }
    );
  }
};
export default authMiddleware;

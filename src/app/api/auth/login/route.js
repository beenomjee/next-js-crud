import { User, connect } from "@/db";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, password } = await req.json();
  try {
    await connect();
    const user = await User.findOne({ email: email });

    if (!user)
      return new NextResponse(
        JSON.stringify({
          message: "User not found!",
        }),
        {
          status: 400,
        }
      );

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return new NextResponse(
        JSON.stringify({
          message: "Password not matched!",
        }),
        {
          status: 400,
        }
      );

    const token = user.generateToken();
    const serializeToken = serialize("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    return new NextResponse(
      JSON.stringify({
        message: "Logged In!",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": serializeToken,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong. Please try again!",
        error: error,
      }),
      {
        status: 500,
      }
    );
  }
};

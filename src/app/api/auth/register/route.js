import { User, connect } from "@/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { name, email, password } = await req.json();
  try {
    await connect();
    const user = new User({ name, email, password });
    await user.save();
    const token = user.generateToken();
    const serializeToken = serialize("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    return new NextResponse(
      JSON.stringify({
        message: "User has been created!",
      }),
      {
        status: 201,
        headers: { "Set-Cookie": serializeToken },
      }
    );
  } catch (error) {
    if (error.code === 11000)
      return new NextResponse(
        JSON.stringify({
          message: "Email already used!",
          error: error,
        }),
        {
          status: 400,
        }
      );

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

import { connect } from "@/db";
import Todo from "@/db/Todo";
import { authMiddleware } from "@/utils";
import { NextResponse } from "next/server";

export const DELETE = authMiddleware(async (req, { params }) => {
  try {
    const { _id } = params;
    await connect();
    const todo = await Todo.findByIdAndDelete(_id);
    if (!todo)
      return NextResponse.json(
        {
          message: "Todo not found!",
        },
        {
          status: 400,
        }
      );
    return NextResponse.json({
      message: "Todo deleted!",
    });
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

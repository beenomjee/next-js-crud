import { connect } from "@/db";
import Todo from "@/db/Todo";
import { authMiddleware, errorHandler } from "@/utils";
import { NextResponse } from "next/server";

export const POST = authMiddleware(async (req, context) => {
  try {
    const userId = req.userId;
    const { description } = await req.json();
    await connect();
    const todo = new Todo({ userId, description });
    await todo.save();
    return NextResponse.json({
      message: "Todo created!",
      todo,
    });
  } catch (error) {
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

export const GET = authMiddleware(async (req, context) => {
  try {
    const userId = req.userId;
    await connect();
    const todos = await Todo.find({ userId });
    return NextResponse.json({
      message: "Todos loaded!",
      todos,
    });
  } catch (error) {
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

export const PUT = authMiddleware(async (req, context) => {
  try {
    const { _id, description, isCompleted } = await req.json();
    await connect();
    const todo = await Todo.findByIdAndUpdate(
      _id,
      {
        description,
        isCompleted,
      },
      { new: true }
    );
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
      message: "Todo updated!",
      todo,
    });
  } catch (error) {
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

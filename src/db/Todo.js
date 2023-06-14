import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.models.todo || mongoose.model("todo", TodoSchema);

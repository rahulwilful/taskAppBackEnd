import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: String, required: true },
  userId: { type: String, required: true },
  done: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const todo = mongoose.model("todo", TodoSchema);
export default todo;

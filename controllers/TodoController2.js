import Task from "../models/TodoModel2.js";

export const addTodo2 = async (req, res) => {
  const newTodo = new Task({
    name: req.body.formValue.name,
    data: req.body.formValue.data,
    userId: req.body.formValue.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newTodo.save();
    return res.status(200).json(newTodo);
  } catch (error) {
    return res.json(500).json(error.message);
  }
};

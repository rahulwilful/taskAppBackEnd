import Todo from "../models/TodoModel.js";

export const addTodo = async (req, res) => {
  const taskName = req.body.formValue.name;
  const taskData = req.body.formValue.data;
  const newTodo = new Todo({
    name: req.body.formValue.name,
    data: `${taskName} - ${taskData}`,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const toggleTodo = async (req, res) => {
  try {
    const oldTodo = await Todo.findById(req.params.id);
    res.setHeader("Cache-Control", "no-cache");
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, { done: !oldTodo.done });
    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    return res.json(500).json(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getAllTodos2 = async (req, res) => {
  try {
    const newTodo = await Todo.find({}).sort({ createdAt: -1 });
    return res.status(200).json(newTodo);
  } catch (error) {
    return res.json(500).json(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllTodos3 = async (req, res) => {
  const { userId } = req.body;
  try {
    const newTodo = await Todo.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(newTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getAllTodos = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required in the request body" });
  }

  try {
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching todos." });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateTodo = async (req, res) => {
  try {
    await Todo.findOneAndUpdate({ _id: req.params.id }, { data: req.body.text });
    const todo = await Todo.findById({ _id: req.params.id });
    return res.status(200).json(todo);
  } catch (error) {
    return res.json(500).json(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).json(todo);
  } catch (error) {
    return res.json(500).json(error.message);
  }
};

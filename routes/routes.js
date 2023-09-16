import express from "express";
import { addTodo } from "../controllers/TodoController.js";
import { getAllTodos } from "../controllers/TodoController.js";
import { toggleTodo } from "../controllers/TodoController.js";
import { updateTodo } from "../controllers/TodoController.js";
import { deleteTodo } from "../controllers/TodoController.js";

const route = express();

route.post("/todos", addTodo);
route.get("/todos", getAllTodos);
route.get("/todos/:id", toggleTodo);
route.put("/todos/:id", updateTodo);
route.delete("/todos/:id", deleteTodo);

export default route;

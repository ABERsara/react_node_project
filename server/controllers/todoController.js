const Todo = require("../models/Todos")


const getAllTodos = async (req, res) => {
    //get all todos from mongoDB
    //lean object because we don't need to update the data or make changes
    const todos = await Todo.find().lean()
    //if no posts
    if (!todos?.length) {
        return res.status(400).json({ message: 'No todos found' })
    }
    res.json(todos)
}

//get todo by id
const getTodoById = async (req, res) => {
    const { id } = req.params
    //Get a single todo from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    const todo = await Todo.findById(id).lean()
    //if no tasks
    if (!todo) {
        return res.status(400).json({ message: 'No todo found' })
    }
    res.json(todo)
}

const createNewTodo = async (req, res) => {

    const { title, tags, completed } = req.body
    //confirm data!
    if (!title) {
        return res.status(400).json({ message: 'title is required' })
    }
    //create and store the new todo
    const todo = await Todo.create({ title, tags,completed })
    if (todo)//create it!
    {
        return res.status(201).json({ message: 'New todo created' })
    }
    else {
        res.status(400).json({ message: "Invalid todo" })
    }
}
//update a todo
//becuse of the changes, we need a exec object , not lean
const updateTodo = async (req, res) => {
    const { _id, title, tags, completed } = req.body;

    // Confirm data
    if (!_id || !title) {
        return res.status(400).json({ message: "Fields are required" });
    }

    // Confirm todo exists to update
    const todo = await Todo.findById(_id).exec();

    if (!todo) {
        return res.status(400).json({ message: "Todo not found" });
    }

    // Validate and ensure completed is a Boolean
    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({ message: "Invalid 'completed' value" });
    }

    // Assign values
    todo.title = title;
    todo.tags = tags;
    todo.completed = completed;

    // Save the changes
    const updatedTodo = await todo.save();
    res.json(`${updatedTodo.name} updated`);
};
const updateTodoCompleted = async (req, res) => {
    const { id } = req.params
    //Confirm data
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).json({ message: "Todo not found" })
    }
    //change to completed
    todo.completed = !todo.completed
    console.log("completed updated")
    //save the changes
    const updatedTodo = await todo.save()
    res.json(`${updatedTodo.title} updated completed ${todo.completed}`)

}
//delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.body

    //Confirm todo existed to delete it
    const todo = await Todo.findById(id).exec()

    if (!todo) {
        return res.status(400).json({ message: "Todo not found" })
    }
    const result = await todo.deleteOne()

    const reply = `Todo '${todo.name}' ID:${todo._id} was deleted`
    res.json(`Result: ${result}\n${reply}`)
}
//ייצוא הפונקציות
module.exports = {
    getAllTodos,
    getTodoById,
    updateTodo, 
    updateTodoCompleted, 
    deleteTodo, 
    createNewTodo
}

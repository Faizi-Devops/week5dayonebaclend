const Todo = require("../models/Todo");


const createTodo = async (req, res) => {
  try {
    const { title, brand, price, description } = req.body;
    
    // Check if any field is empty
    if (!title || !brand || !price || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = new Todo({
      title,
      brand,
      price,
      description,
    });

    const data = await user.save();

    res.status(201).json({
      message: 'Todo created successfully!',
      user: data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating a Todo',
    });
  }
};


const getAllTodo = async (req, res) => {
  try {
    const states = await Todo.find();
    res.status(200).json({
      Todo: states,
      message: "Todo Fetch Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedResource = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const stateId = req.params.id;
    const { title, description, brand, price } = req.body;

    // Check if any field is empty
    if (!title || !description || !brand || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find the state by its ID
    const state = await Todo.findById(stateId);
    if (!state) {
      return res.status(404).send({ error: "Todo not found" });
    }

    // Update the 'todo' field
    state.title = title;
    state.description = description;
    state.price = price;
    state.brand = brand;

    // Save the updated state
    await state.save();

    res.status(200).send({
      state,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createTodo, getAllTodo, deleteTodo, updateTodo };

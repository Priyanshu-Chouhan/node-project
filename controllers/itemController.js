const Item = require('../models/Item');

// @desc    Delete an item
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all items
// @route   GET /api/items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new item
// @route   POST /api/items
const createItem = async (req, res) => {
  const { name, description, quantity } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      quantity,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, description, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};

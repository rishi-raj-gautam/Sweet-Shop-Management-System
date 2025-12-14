const Sweet = require("../models/Sweet");

/**
 * POST /api/sweets
 * Admin only
 */
exports.createSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

/**
 * GET /api/sweets
 */
exports.getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

/**
 * GET /api/sweets/search
 */
exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {
      $gte: minPrice || 0,
      $lte: maxPrice || Number.MAX_SAFE_INTEGER
    };
  }

  const sweets = await Sweet.find(filter);
  res.json(sweets);
};

/**
 * PUT /api/sweets/:id
 * Admin only
 */
exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.json(sweet);
};

/**
 * DELETE /api/sweets/:id
 * Admin only
 */
exports.deleteSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndDelete(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.json({ message: "Sweet deleted successfully" });
};

/**
 * POST /api/sweets/:id/purchase
 */
exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.json(sweet);
};

/**
 * POST /api/sweets/:id/restock
 * Admin only
 */
exports.restockSweet = async (req, res) => {
  const { amount } = req.body;

  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (amount <= 0) {
  const err = new Error("Restock amount must be positive");
  err.statusCode = 400;
  throw err;
}


  sweet.quantity += amount;
  await sweet.save();

  res.json(sweet);
};

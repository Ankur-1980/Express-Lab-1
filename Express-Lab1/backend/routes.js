const router = require("express").Router();
const items = require("./items");

// get list of items
router.get("", (req, res, next) => {
  const { maxPrice, prefix, pageSize } = req.query;
  let tempArray;
  let cached = {};
  if (maxPrice) {
    tempArray = items.filter((item) => item.price <= parseInt(maxPrice));
    cached["maxPrice"] = tempArray.sort((a, b) => a - b);
  }

  if (pageSize) {
    tempArray = cached["maxPrice"]
      ? cached["maxPrice"].slice(0, parseInt(pageSize))
      : items.slice(0, parseInt(pageSize));
    cached["pageSize"] = tempArray.sort((a, b) => a - b);
  }

  if (prefix) {
    tempArray = cached["pageSize"]
      ? cached["pageSize"].filter((item) => item.product.startsWith(prefix))
      : tempArray.filter((item) => item.product.startsWith(prefix));
  }

  res
    .status(200)
    .json({ message: "Items Fetched", items: tempArray ? tempArray : items });
});

// get individual item
router.get("/:id", (req, res) => {
  const found = items.some((item) => item.id === parseInt(req.params.id));

  // if found return info
  if (found) {
    res
      .status(200)
      .json(items.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    // return bad request
    res
      .status(404)
      .json({ message: `No item with the id of ${req.params.id}` });
  }
});

// add new item
router.post("", (req, res, next) => {
  const newItem = {
    id: req.body.id,
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  console.log(newItem);
  items.push(newItem);
  res.status(201).json({ message: "Item added Successfully", items: items });
});

// edit an item
router.put("/:id", (req, res) => {
  const found = items.some((item) => item.id === parseInt(req.params.id));

  // if found return info
  if (found) {
    items.forEach((item) => {
      if (item.id === parseInt(req.params.id)) {
        item.product = req.body.product ? req.body.product : item.product;
        item.price = req.body.price ? req.body.price : item.price;
        item.quantity = req.body.quantity ? req.body.quantity : item.quantity;
        res.status(200).json({ message: "Item updated", item });
      }
    });
  } else {
    // return bad request
    res
      .status(400)
      .json({ message: `No item with the id of ${req.params.id}` });
  }
});

// delete an item
router.delete("/:id", (req, res, next) => {
  const found = items.some((item) => item.id === parseInt(req.params.id));

  if (found) {
    res.status(200).json({
      message: "Item Deleted",
      items: items.filter((item) => item.id !== parseInt(req.params.id)),
    });
  } else {
    res
      .status(400)
      .json({ message: `No item with the ID of ${req.params.id}` });
  }
});

module.exports = router;

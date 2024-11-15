import express from "express";
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.json({ message: "unofficial backrooms api" });
});

export default router;

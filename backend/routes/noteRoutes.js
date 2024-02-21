const express = require("express");
const {
  getNotes,
  CreateNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getNotes);
router.post("/create", protect, CreateNote);
router.get("/:id", getNoteById);
router.put("/:id", protect, UpdateNote);
router.delete("/:id", protect, DeleteNote);

module.exports = router;

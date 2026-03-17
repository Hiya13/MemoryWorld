const generateScene = require("../services/sceneGenerator");
const express = require("express");
const router = express.Router();
const Diary = require("../models/Diary");

// POST diary entry
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    const sceneData = await generateScene(text);

    const newEntry = new Diary({
      text,
      scene: sceneData
    });

    const savedEntry = await newEntry.save();

    res.status(201).json(savedEntry);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all diary entries
router.get("/", async (req, res) => {
  try {
    const entries = await Diary.find().sort({ createdAt: -1 });

    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
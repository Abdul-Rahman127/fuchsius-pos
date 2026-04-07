const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');


router.get('/', async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings || {});
});


router.post('/', async (req, res) => {
  const updatedSettings = await Settings.findOneAndUpdate({}, req.body, { upsert: true, new: true });
  res.json(updatedSettings);
});

module.exports = router;
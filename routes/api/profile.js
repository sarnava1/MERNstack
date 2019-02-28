const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({ msg : 'profiles test'}));

module.exports = router;

const express = require('express');
const {
    getInsights,
    predictRank,
    predictCollege
} = require('../controllers/quizController');

const router = express.Router();

router.get('/insights', getInsights);
router.get('/predict-rank', predictRank);
router.get('/suggest-colleges/:userId', predictCollege);

module.exports = router; 
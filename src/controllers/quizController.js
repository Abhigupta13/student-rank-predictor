const { fetchAllQuizData, analyzeUserPerformance, predictRank, predictCollege } = require('../services/quizService');

const getInsights = async (req, res) => {
    try {
        const data = await fetchAllQuizData();
        if (!data) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }

        const insights = analyzeUserPerformance(data);
        if (!insights) {
            return res.status(500).json({ error: "Failed to analyze user performance" });
        }

        res.json(insights);
    } catch (error) {
        console.error("Error in getInsights:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const predictRankController = async (req, res) => {
    try {
        const data = await fetchAllQuizData();
        if (!data) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }

        const insights = analyzeUserPerformance(data);
        if (!insights) {
            return res.status(500).json({ error: "Failed to analyze user performance" });
        }

        let rankPredictions = {};

        try {
            Object.keys(insights).forEach(userId => {
                const userInsight = insights[userId];
                if (!userInsight) {
                    throw new Error(`Invalid user insight data for user ${userId}`);
                }

                const predictedRankValue = predictRank(userInsight);
                if (predictedRankValue === undefined || predictedRankValue === null) {
                    throw new Error(`Failed to predict rank for user ${userId}`);
                }

                rankPredictions[userId] = {
                    predictedRank: predictedRankValue,
                    accuracy: userInsight.accuracy,
                    totalScore: userInsight.totalScore
                };
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(rankPredictions);
    } catch (error) {
        console.error("Error in predictRankController:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const predictCollegeController = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const data = await fetchAllQuizData();
        if (!data) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }

        const insights = analyzeUserPerformance(data);
        if (!insights) {
            return res.status(500).json({ error: "Failed to analyze user performance" });
        }

        if (!insights[userId]) {
            return res.status(404).json({ error: "User not found" });
        }

        const predictedRank = predictRank(insights[userId]);
        if (predictedRank === undefined || predictedRank === null) {
            return res.status(500).json({ error: "Failed to predict rank" });
        }

        const suggestedColleges = predictCollege(predictedRank);
        if (!suggestedColleges || !Array.isArray(suggestedColleges)) {
            return res.status(500).json({ error: "Failed to predict colleges" });
        }

        res.json({
            userId,
            predictedRank,
            suggestedColleges
        });
    } catch (error) {
        console.error("Error in predictCollegeController:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getInsights,
    predictRank: predictRankController,
    predictCollege: predictCollegeController
}; 
const express = require("express");
const bodyParser = require("body-parser");
const quizRoutes = require('./src/routes/quizRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
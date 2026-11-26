const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working!"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
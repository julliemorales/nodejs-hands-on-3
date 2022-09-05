const express = require("express");
const app = express();

const articleRouter = require("./src/routes/article.routes");

app.get("/", function (req, res) {
  res.status(200).send("Nothing to see here.");
});

app.use("/articles", articleRouter);

const PORT = 3050;
app.listen(PORT, function () {
  console.log(`Server is now running on port ${PORT}`);
});

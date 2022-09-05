const express = require("express");
const app = express();

app.set("view engine", "ejs");

const articleRouter = require("./routes/article.routes");

app.get("/", function (req, res) {
  res.status(200).render("pages/index");
});

app.use("/articles", articleRouter);

const PORT = 3050;
app.listen(PORT, function () {
  console.log(`Server is now running on port ${PORT}`);
});

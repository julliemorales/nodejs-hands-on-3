const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const articleRouter = require("./routes/article.routes");
const articleMock = require("./mock/articleMock");

// * Home Page
app.get("/", function (req, res) {
  res.status(200).render("pages/index");
});

// * About Page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

// * View Page
app.get("/gallery/view/:id", (req, res) => {
  const singleArticle = articleMock.articles.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.render("pages/gallery/view", { singleArticle });
});

// * Gallery Page
app.get("/gallery", function (req, res) {
  res.render("pages/gallery", { articles: articleMock.articles });
});

app.use("/articles", articleRouter);

const PORT = 3050;
app.listen(PORT, function () {
  console.log(`Server is now running on port ${PORT}`);
});

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// const articleRouter = require("./routes/article.routes");
const articleMock = require("./mock/articleMock");

app.use(express.json());

// Home Page
app.get("/", (req, res) => {
  res.status(200).render("pages/index");
});

// About Page
app.get("/about", (req, res) => {
  res.render("pages/about");
});

// ADD Page
app.get("/gallery/create", (req, res) => {
  res.render("pages/add", { articles: articleMock.articles });
});

app.post("/gallery/create", (req, res) => {
  const body = req.body;
  console.log(body);
  res.render("pages/new", { article: body });
});

//UPDATE Page
app.get("/gallery/:id/update", (req, res) => {
  const article = articleMock.articles.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.render("pages/update", { article });
});

app.put("/gallery/:id/view", (req, res) => {
  const article = articleMock.articles.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.render("pages/view", { article });
});

// DELETE Page
app.delete("/gallery/:id/delete", (req, res) => {
  const isExisting = articleMock.articles.some((article) => {
    return article.id === parseInt(req.params.id);
  });
  isExisting
    ? res.redirect("/gallery")
    : res.status(404).send("Article does not exist");
});

// View Page
app.get("/gallery/:id", (req, res) => {
  const article = articleMock.articles.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.render("pages/view", { article });
});

// Gallery Page
app.get("/gallery", (req, res) => {
  res.render("pages/gallery", { articles: articleMock.articles });
});

// app.use("/articles", articleRouter);

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});

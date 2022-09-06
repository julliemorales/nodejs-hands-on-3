const { request } = require("express");
const express = require("express");
const app = express();
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// const articleRouter = require("./routes/article.routes");
const articleMockOld = require("./mock/articleMock");
const articleMock = [...articleMockOld.articles];

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
  res.render("pages/add", { articles: articleMock });
});

app.post("/gallery/create", (req, res) => {
  const body = req.body;
  res.render("pages/new", { article: body });
});

//UPDATE Page
app.get("/gallery/:id/update", (req, res) => {
  const article = articleMock.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.render("pages/update", { article });
});

app.put("/gallery/:id/update", (req, res) => {
  const article = req.body;
  res.render("pages/view", { article });
});

// DELETE Page
app.delete("/gallery/:id/delete", (req, res) => {
  // const isExisting = articleMock.some((article) => {
  //   return article.id === parseInt(req.params.id);
  // });
  const objWithIdIndex = articleMock.findIndex(
    (obj) => obj.id === parseInt(req.params.id)
  );
  articleMock.splice(objWithIdIndex, 1);

  // isExisting
  res.render("pages/gallery", { articles: articleMock });
  // : res.status(404).send("Article does not exist");
});

// View Page
app.get("/gallery/:id", (req, res) => {
  const article = articleMock.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.render("pages/view", { article });
});

// Gallery Page
app.get("/gallery", (req, res) => {
  res.render("pages/gallery", { articles: articleMock });
});

// app.use("/articles", articleRouter);

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});

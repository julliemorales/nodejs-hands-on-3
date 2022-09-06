const express = require("express");
const galleryRouter = express.Router();
const methodOverride = require("method-override");
const articleMockOld = require("../mock/articleMock");
let articleMock = [...articleMockOld.articles];

galleryRouter.use(express.urlencoded({ extended: true }));
galleryRouter.use(methodOverride("_method"));

galleryRouter.use(express.json());

// CREATE Article
galleryRouter.get("/create", (req, res) => {
  res.render("pages/add", { articles: articleMock });
});

galleryRouter.post("/create", (req, res) => {
  let body = req.body;
  //   body = { ...body, imageSrc: "https://dummyimage.com/400x300/000/fff" };
  //   articleMock = [...articleMock, body];
  res.render("pages/new", { article: body });
});

//UPDATE Article
galleryRouter.get("/:id/update", (req, res) => {
  const article = articleMock.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.render("pages/update", { article });
});

galleryRouter.put("/:id/update", (req, res) => {
  const article = req.body;
  res.render("pages/view", { article });
});

// DELETE Article
galleryRouter.delete("/:id/delete", (req, res) => {
  const objWithIdIndex = articleMock.findIndex(
    (obj) => obj.id === parseInt(req.params.id)
  );

  if (objWithIdIndex > -1) {
    articleMock.splice(objWithIdIndex, 1);
    res.render("pages/gallery", { articles: articleMock });
  } else {
    res.render("pages/error");
  }
});

// View Single Article
galleryRouter.get("/:id", (req, res) => {
  const article = articleMock.find(
    (article) => article.id === parseInt(req.params.id)
  );
  console.log(article);
  res.render("pages/view", { article });
});

// View All Articles
galleryRouter.get("/", (req, res) => {
  res.render("pages/gallery", { articles: articleMock });
});

module.exports = galleryRouter;

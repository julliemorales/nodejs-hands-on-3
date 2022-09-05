const express = require("express");
const articleMock = require("../mock/articleMock");
const articleRouter = express.Router();

articleRouter.use(express.json());

// GET

articleRouter.get("/", (req, res) => {
  res.status(200).send(articleMock.articles);
});

articleRouter.get("/:id", (req, res) => {
  const singleArticle = articleMock.articles.find(
    (article) => article.id === parseInt(req.params.id)
  );
  res.status(200).send(singleArticle);
});

// POST

articleRouter.post("/:id/create", (req, res) => {
  const { author, title, order, completed } = req.body;
  res
    .status(201)
    .send(
      `(Creation ID: ${req.params.id}) ${author} has created a new article entitled "${title}". Order no: ${order}. Status: ${completed}`
    );
});

// PUT

articleRouter.put("/:id", (req, res) => {
  const isExisting = articleMock.articles.some((article) => {
    return article.id === parseInt(req.params.id);
  });

  isExisting
    ? res.status(201).send("Article Updated")
    : res.status(404).send("Article does not exist");
});

// DELETE

articleRouter.delete("/:id", (req, res) => {
  const isExisting = articleMock.articles.some((article) => {
    return article.id === parseInt(req.params.id);
  });

  isExisting
    ? res.status(202).send("Article Deleted")
    : res.status(404).send("Article does not exist");
});

module.exports = articleRouter;

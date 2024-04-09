// for downloading file we can also directly use res.download(filePath) provided by express
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// router.get("/resume/:file", (req, res) => {
//     console.log("want to download resume");
//     res.sendFile(`${req.params.file}`);
// });

router.get("/resume/:file", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "resume",
    req.params.file
  );
  res.sendFile(filePath);
});




router.get("/profile/:file", (req, res) => {
  res.sendFile(`${req.params.file}`);
});


router.get("/verification/:file", (req, res) => {

    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "verification",
      req.params.file
    );
    res.sendFile(filePath);
});

module.exports = router;

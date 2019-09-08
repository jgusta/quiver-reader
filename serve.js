const path = require("path");
const express = require("express");
const Bundler = require("parcel-bundler");
const app = express();
const fs = require('fs');

const quiver = path.join(__dirname, "../Quiver.qvlibrary");

const bundler = new Bundler(path.join(__dirname, "src/index.html"), {
  production: process.env.NODE_ENV === "production"
});

app.get("/lib/notebooks", function(req, res) {
  fs.readFile(`${quiver}/meta.json`, function(err, data){
    res.json(JSON.parse(data));
  });
});

app.get("/lib/notebook/:uuid", function(req, res) {
  let uuid = req.params.uuid.replace(/^.*\/(?=[^\/]*$)/, "");
  let title = "";
  let fileList = [];

  fs.readdir(`${quiver}/${uuid}.qvnotebook`, function(err, items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i] === "meta.json") {
        title = JSON.parse(
          fs.readFileSync(`${quiver}/${uuid}.qvnotebook/meta.json`)
        ).name;
      } else {
        fileList.push({
          note_uuid: items[i].replace(/\.qvnote/, ""),
          note_dir: items[i]
        });
      }
    }
    res.json({
      notebook_title: title,
      notebook_file_list: fileList
    });
  });
});

app.use(
  "/lib",
  express.static(path.join(__dirname, "../Quiver.qvlibrary"), {
    setHeaders: function(res, path) {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
      res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.type("application/json");
    }
  })
);

app.use(bundler.middleware());



app.listen(3000, () => console.log("Listening on port 3000"));

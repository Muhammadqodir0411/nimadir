import express from "express";
import path from "path";
import fs from "fs";
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = JSON.parse(
  fs.readFileSync("./src/database/products.json", "utf-8")
);
let categories = JSON.parse(
  fs.readFileSync("./src/database/categories.json", "utf-8")
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views/"));

app.get("/", (req, res) => {
  res.render("home.ejs", { products: products, categories });
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    let prod = products.filter((el) => el.category == id);
    res.render("home.ejs", { products: prod, categories });
  } else {
    res.render("home.ejs", { products: products, categories });
  }
});

app.post("/products", (req, res) => {
  const { name, price, imgUrl, category } = req.body;
  if (
    !products.find(
      (el) =>
        el.name == name &&
        el.price == price &&
        el.imgUrl == imgUrl &&
        el.category == category
    )
  ) {
    products.push({
      id: products.at(-1)?.id ? products.at(-1)?.id + 1 : 1,
      name,
      price,
      imgUrl,
      category,
    });
  }

  fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify(products, null, 4)
  );
  res.render("home.ejs", { products: products, categories });
});

app.listen(5000, () => console.log("server is runing"));

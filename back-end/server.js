const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/oldroydgames', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

/////////////////////////////////////////////////////////////
//                   ARTICLES AND NEWS                     //
/////////////////////////////////////////////////////////////

// Create a scheme for articles
const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  image_path: String,
  author: String,
  date: Date,
});

// Create a model for articles.
const Article = mongoose.model('Article', articleSchema);

// Create a new article
app.post('/api/news/articles', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    body: req.body.body,
    image_path: req.body.image_path,
    author: "Insert username here", //req.body.author,
    date: req.body.date,
  });
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all articles
app.get('/api/news/articles', async (req, res) => {
  try {
    let articles = await Article.find();
    res.send(articles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a specific article
app.get('/api/news/articles/:id', async (req, res) => {
  try {
    article = await Article.findOne({
      _id: req.params.id
    });
    res.send(article);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit an article
app.put('/api/news/articles/:id', async (req, res) => {
  try {
    article = await Article.findOne({
      _id: req.params.id
    });
    console.log("Title of " + req.params.id + " changed to: " + req.body.title)
    article.title = req.body.title;
    article.body = req.body.body;
    article.image_path = req.body.image_path;
    //article.author = req.body.author;
    // Creation date is technically already saved with id, but if edit date is implemented this would be useful
    //article.publish_date = req.body.publish_date;
    article.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an article
app.delete('/api/news/articles/:id', async (req, res) => {
  try {
    await Article.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/////////////////////////////////////////////////////////////
//                   PRODUCTS AND SHOP                     //
/////////////////////////////////////////////////////////////

// Create a scheme for products
const productSchema = new mongoose.Schema({
  name: String,
  brief: String,
  description: String,
  type: String,
  price: Number,
  image_path: String,
});

// Create a model for products.
const Product = mongoose.model('Product', productSchema);

// Create a new product
app.post('/api/shop/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    brief: req.body.brief,
    description: req.body.description,
    type: req.body.type,
    price: req.body.price,
    image_path: req.body.image_path,
  });
  try {
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all products
app.get('/api/shop/products', async (req, res) => {
  try {
    let products = await Product.find();
    res.send(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a specific product
app.get('/api/shop/products/:id', async (req, res) => {
  try {
    product = await Product.findOne({
      _id: req.params.id
    });
    res.send(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit a product
app.put('/api/shop/products/:id', async (req, res) => {
  try {
    product = await Product.findOne({
      _id: req.params.id
    });
    product.name = req.body.name,
    product.brief = req.body.brief,
    product.description = req.body.description,
    product.type = req.body.type,
    product.price = req.body.price,
    product.image_path = req.body.image_path,
    product.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete a product
app.delete('/api/shop/products/:id', async (req, res) => {
  try {
    await Product.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));

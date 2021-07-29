const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require('../models/category');

exports.createProduct = (req, res) => {
  //res.status(200).json({ file: req.files, body: req.body });

  const {
    name,
    slug,
    price,
    quantity,
    description,
    category,
    createdBy,
  } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      return {
        img: file.filename
      }
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save(((error, product) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (product) {
      return res.status(201).json({ product });
    }
  }))
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug }).select('_id type')
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }

      category && Product.find({ category: category._id })
        .exec((error, products) => {

          if (error) {
            return res.status(400).json({ error });
          }

          if (category.type) {
            if (products.length > 0) {

              res.status(200).json({
                products,
                priceRange: {
                  under1Lakh: 100000,
                  under2Lakh: 200000,
                  under3Lakh: 300000,
                  under5Lakh: 500000,
                 under10Lakh: 1000000,
                 under15Lakh: 1500000,
                 under20Lakh: 2000000,
                  over20Lakh: 2000000,
                },
                productsByPrice: {
                  under1Lakh: products.filter(product => product.price <= 100000),
                  under2Lakh: products.filter(product => product.price > 100000 && product.price <= 200000),
                  under3Lakh: products.filter(product => product.price > 200000 && product.price <= 300000),
                  under5Lakh: products.filter(product => product.price > 300000 && product.price <= 500000),
                  under10Lakh: products.filter(product => product.price > 500000 && product.price <= 1000000),
                  under15Lakh: products.filter(product => product.price > 1000000 && product.price <= 1500000),
                  under20Lakh: products.filter(product => product.price > 1500000 && product.price <= 2000000),
                  over20Lakh: products.filter(product => product.price > 2000000),
                }
              });
            }
          }else{
            res.status(200).json({ products })
          }
        })

    });
}

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.deleteProductById = (req, res) => {
  const {productId} = req.body.payload;
  Product.deleteOne({ _id: productId}).exec((error, result) => {
    if(error) return res.status(400).json({error});
    if(result){
      res.status(202).json({result});
    }
  })
}

exports.getProducts = async (req, res) => {
  const products = await Product.find({})
  .select("_id name price quantity slug description productPictures category")
  .populate({ path: "category", select: "_id name" })
  .exec({});

  res.status(200).json({ products });
}
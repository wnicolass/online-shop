const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const ProductSchema = require('../schemas/ProductSchema');

const ProductModel = mongoose.model('Product', ProductSchema);

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();

    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await ProductModel.create(productData);
  }

  static async findAll() {
    const allProducts = await ProductModel.find();
    return allProducts.map((productDoc) => new Product(productDoc));
  }

  static async findProductById(productId) {
    let foundProduct;
    try {
      foundProduct = await ProductModel.findById(productId);
    } catch (err) {
      err.code = 404;
      throw err;
    }

    return new Product(foundProduct);
  }

  static async findMultiple(ids) {
    const productIds = ids.map((id) => new ObjectId(id));
    const products = await ProductModel.find({ _id: { $in: productIds } });

    return products.map((prodDoc) => new Product(prodDoc));
  }

  async update() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (!this.id) {
      const error = new Error('The product need to have an ID.');
      error.code = 400;
      throw error;
    }

    if (!this.image) {
      delete productData.image;
    }
    await ProductModel.findByIdAndUpdate(this.id, productData);
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  delete() {
    if (!this.id) {
      const error = new Error('The product need to have an ID.');
      error.code = 400;
      throw error;
    }

    return ProductModel.findOneAndDelete({ _id: this.id });
  }
}

module.exports = Product;

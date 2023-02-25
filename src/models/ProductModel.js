const mongoose = require('mongoose');
const ProductSchema = require('../schemas/ProductSchema');

const ProductModel = mongoose.model('Product', ProductSchema);

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;

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
    const foundProduct = await ProductModel.findById(productId);

    if (!foundProduct) {
      const error = new Error('Could not find product with provided id.');
      error.code = 404;
      throw error;
    }

    return foundProduct;
  }
}

module.exports = Product;

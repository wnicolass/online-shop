const Product = require('./ProductModel');

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product,
      quantity: 1,
      totalPrice: product.price,
    };

    if (this.items.length > 0) {
      for (let i = 0; i < this.items.length; i += 1) {
        const item = this.items[i];
        if (item.product.id === product.id) {
          cartItem.quantity = item.quantity + 1;
          cartItem.totalPrice = item.totalPrice + product.price;
          this.items[i] = cartItem;

          this.totalQuantity += 1;
          this.totalPrice += product.price;
          return;
        }
      }
    }
    this.items.push(cartItem);
    this.totalQuantity += 1;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i += 1) {
      const item = this.items[i];
      if (item.product.id === productId && newQuantity > 0) {
        const cartItem = { ...item };
        const quantityDiff = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * cartItem.product.price;
        this.items[i] = cartItem;

        this.totalQuantity += quantityDiff;
        this.totalPrice += quantityDiff * cartItem.product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      }

      if (item.product.id === productId && newQuantity <= 0) {
        this.items.splice(i, 1);
        this.totalQuantity -= item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }
  }

  async updatePrices() {
    const productIds = this.items.map((item) => item.product.id);
    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const cartItem of this.items) {
      const product = products.find((prod) => prod.id === cartItem.product.id);

      if (!product) {
        // product was deleted!
        // "schedule" for removal from cart
        deletableCartItemProductIds.push(cartItem.product.id);
        // eslint-disable-next-line no-continue
        continue;
      }

      // product was not deleted
      // set product data and total price to latest price from database
      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(
        (item) => deletableCartItemProductIds.indexOf(item.product.id) < 0,
      );
    }

    // re-calculate cart totals
    this.totalQuantity = 0;
    this.totalPrice = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.items) {
      this.totalQuantity += item.quantity;
      this.totalPrice += item.totalPrice;
    }
  }
}

module.exports = Cart;

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
}

module.exports = Cart;

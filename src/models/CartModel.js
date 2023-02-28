class Cart {
  constructor(items = []) {
    this.items = items;
  }

  addItem(product) {
    const cartItem = { product, quantity: 1, totalPrice: product.price };

    if (this.items.length > 0) {
      for (let i = 0; i < this.items.length; i += 1) {
        const item = this.items[i];
        if (item.product.id === product.id) {
          cartItem.quantity += 1;
          cartItem.totalPrice += product.price;
          this.items[i] = cartItem;
          return;
        }
      }
    }

    this.items.push(cartItem);
  }
}

module.exports = Cart;

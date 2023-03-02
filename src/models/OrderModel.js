class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, user, date, id, status = 'pending') {
    this.productData = cart;
    this.userData = user;
    this.status = status;
    this.date = new Date(date);
    this.formattedDate = this.date.toLocaleDateString('pt-PT', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.id = id;
  }
}

module.exports = Order;

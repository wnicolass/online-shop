class OrderController {
  async addOrder(req, res) {
    const { cart } = res.locals;
  }
}

module.exports = new OrderController();

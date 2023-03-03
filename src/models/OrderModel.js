const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const OrderSchema = require('../schemas/OrderSchema');

const OrderModel = mongoose.model('Order', OrderSchema);

class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, user, date, id, status = 'pending') {
    this.productData = cart;
    this.userData = user;
    this.date = new Date(date);
    this.formattedDate = this.date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.id = id;
    this.status = status;
  }

  save() {
    const orderDocument = {
      userData: this.userData,
      productData: this.productData,
      date: new Date(),
      status: this.status,
    };

    return OrderModel.create(orderDocument);
  }

  update() {
    return OrderModel.findByIdAndUpdate({ _id: this.id }, { $set: { status: this.status } });
  }

  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.date,
      orderDoc._id,
      orderDoc.status,
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

  static async findAll() {
    const orders = await OrderModel.find();

    return this.transformOrderDocuments(orders);
  }

  static async findAllForUser(userId) {
    const orders = await OrderModel.find({ 'userData._id': new ObjectId(userId) }).sort({ _id: -1 });
    console.log(orders);

    return this.transformOrderDocuments(orders);
  }

  static async findOrderById(orderId) {
    const order = await OrderModel.findOne({ _id: orderId });

    return this.transformOrderDocument(order);
  }
}

module.exports = Order;

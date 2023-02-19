const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.emit('connected to db');
  })
  .catch((e) => console.log(e.message));

app.on('connected to db', () => {
  app.listen(process.env.PORT, () => console.log('App running'));
});

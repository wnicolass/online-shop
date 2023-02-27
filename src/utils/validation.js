const validator = require('validator');

function areInputsEmpty(...inputs) {
  return inputs.some((input) => validator.isEmpty(input));
}

function isValidUser(email, password) {
  return validator.isEmail(email)
  && password
  && password.trim().length >= 6;
}

function areUserDataValid({
  email, password, fullname: name, street, postal, city,
}) {
  return isValidUser(email, password) && !areInputsEmpty(name, street, postal, city);
}

function areEqualEmails({ email, confirmEmail }) {
  return email === confirmEmail;
}

module.exports = {
  areUserDataValid,
  areEqualEmails,
  areInputsEmpty,
};

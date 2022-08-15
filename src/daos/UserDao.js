const SchemaUser = require('../models/UserModel');

class UserDao {
  async getUser(email) {
    return await SchemaUser.findOne({ email: email });
  }

  async getUserByEmailAndPassword(email, password) {
    return await SchemaUser.findOne({ email: email, password: password });
  }

  async create(email, password, firstname, lastname) {
    let userCreated = await SchemaUser.create({
      lastName: lastname,
      firstName: firstname,
      email: email,
      password: password,
    });

    return userCreated;
  }
}

module.exports = { UserDao };

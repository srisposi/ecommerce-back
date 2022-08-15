const { UserDao } = require('../daos/UserDao');
const UnauthorizeException = require('../exceptions/UnauthorizeException');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'myprivatekey';
const md5 = require('md5');
class UserService {
  encodePassword(password) {
    let newPassword = md5(password);
    return newPassword;
  }

  generateToken(email) {
    const token = jwt.sign({ data: email }, PRIVATE_KEY, { expiresIn: '1h' });
    return token;
  }

  decodeToken(token) {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload;
  }

  async getUserByToken(token) {
    try {
      const userDao = new UserDao();
      let data = this.decodeToken(token); //user:password
      const email = data.split(':')[0];
      const password = data.split(':')[1];

      const usuario = await userDao.getUserByEmailAndPassword(email, password);

      return usuario;
    } catch (error) {
      return console.log(error);
    }
  }

  async createUsuario(email, password, firstname, lastname) {
    try {
      const usuarioDao = new UserDao();
      const usuario = await usuarioDao.getUser(email);

      if (!usuario) {
        return await usuarioDao.create(
          email,
          this.encodePassword(password),
          firstname,
          lastname
        );
      } else {
        return { message: 'User already exist' };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getToken(email, password) {
    const userDao = new UserDao();
    const usuario = await userDao.getUserByEmailAndPassword(
      email,
      this.encodePassword(password)
    );

    if (usuario) {
      let tokenResponse = this.generateToken(
        `${email}:${this.encodePassword(password)}`
      );
      //verify token
      console.log(this.decodeToken(tokenResponse));
      const user = await this.getUserByToken(tokenResponse);
      console.log(user);

      return tokenResponse;
    } else {
      throw new UnauthorizeException('Not allowed');
    }
  }
}

module.exports = UserService;

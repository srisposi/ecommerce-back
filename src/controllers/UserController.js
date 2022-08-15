const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/UserService');
const UnauthorizeException = require('../exceptions/UnauthorizeException');

let userService = new UserService();

userRouter.post('/register', async (req, res) => {
  try {
    let usuario = req.body;
    res
      .status(201)
      .json(
        await userService.createUsuario(
          usuario.email,
          usuario.password,
          usuario.firstname,
          usuario.lastname
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    let token = await userService.getToken(email, password);
    res.status(200).json({ token: token });
  } catch (error) {
    if (error instanceof UnauthorizeException)
      res.status(400).json({ message: error.message });
    else res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;

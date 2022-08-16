const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const routerUser = require("./src/controllers/UserController");
const port = process.env.PORT || 8007;

mongoose
  .connect(
    "mongodb+srv://root:root1234@cluster0.vmcmhk0.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    //definición de middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.get("/api/health", (req, res) => {
      res.status(200).send({ message: "OK!" });
    });

    app.use("/api/user", routerUser);

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Estamos escuchando en está url: ${port}`);
    });
  });

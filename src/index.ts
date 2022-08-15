const express = require("express");
const config = require("./config");
const app = express();

//definición de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/health", (req, res) => {
  res.status(200).send({ message: "OK!" });
});

app.listen(config.port, () => {
  console.log(`Estamos escuchando en está url: ${config.port}`);
});

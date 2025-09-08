const express = require("express");
const cors = require("cors");
const { port } = require("./config/environment");
const fakeRoutes = require("./routes/fakeRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", fakeRoutes);

app.listen(port, () => {
  console.log(`✅ Fake API rodando na porta ${port}`);
});

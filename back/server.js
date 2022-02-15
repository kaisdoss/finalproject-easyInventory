const express = require("express");
const connectDB = require("./helpers/connectDB");
const app = express();
const cors = require("cors");
const login = require("./routes/login");
const authorized = require('./helpers/authMiddleware');
const rolized = require('./helpers/roleMiddleware');

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello From Server!");
});
app.use(express.json());
app.use("/register", require("./routes/register"));
app.use("/login", login);
app.use("/post", require("./routes/post"));
app.use("/products", require("./routes/productRoute"));
app.use("/facture", require("./routes/factureRoute"));
app.use("/user", require("./routes/userRoute"));

app.use("/product", authorized, rolized, require("./routes/product"));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`server is running om PORT: ${PORT}`));

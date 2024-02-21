const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const experimentRoutes = require("./routes/experimentRoutes");
const logRoutes = require("./routes/logRoutes");
const insightRoutes = require("./routes/insightRoutes");
const aiRoutes = require("./routes/aiRoutes.js");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://proof-loop-zeta.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/experiments", experimentRoutes);
app.use("/api/experiments", logRoutes);
app.use("/api/experiments", insightRoutes);

const {
  getUsers,
  createUser,
  editUser,
  deleteUser,
} = require("./controllers/userController.js");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.get("/api/users", getUsers);

app.post("/api/users", createUser);

app.patch("/api/users/:id", editUser);

app.delete("/api/users/:id", deleteUser);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server listening at port ${process.env.PORT}`);
});

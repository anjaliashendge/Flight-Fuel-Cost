const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const flightRoutes = require("./routes/flight");
app.use("/", flightRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).render("error", { message: err.message });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
// index.js (atau server.js)
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./route/userroute.js";
import gunungRoutes from "./route/gunungroute.js";
import basecampRoutes from "./route/basecamproute.js";
import registrasiRoutes from "./route/registrasiroute.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/gunung", gunungRoutes);
app.use("/api/basecamp", basecampRoutes);
app.use("/api/registrasi", registrasiRoutes);

// Root route (opsional)
app.get("/", (req, res) => {
  res.send("API Pendakian Gunung Berjalan dengan Baik!");
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

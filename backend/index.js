import express from "express";
import cors from "cors";
import './config/firebase.js';

import userRoutes from "./route/userroute.js";
import gunungRoutes from "./route/gunungroute.js";
import basecampRoutes from "./route/basecamproute.js";
import registrasiRoutes from "./route/registrasiroute.js";

import * as models from "./model/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/gunung", gunungRoutes);
app.use("/api/basecamp", basecampRoutes);
app.use("/api/registrasi", registrasiRoutes);

app.get("/", (req, res) => {
  res.send("API Pendakian Gunung Berjalan dengan Baik!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server setelah database connect
(async () => {
  try {
    await models.db.authenticate();
    console.log("Database connected.");
    // await models.db.sync(); // uncomment jika ingin sinkronisasi otomatis
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal koneksi ke database:", error);
  }
})();

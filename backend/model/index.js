// models/index.js
import db from "../config/database.js";

import { User } from "./usermodel.js";
import { Gunung } from "./gunungmodel.js";
import { Basecamp } from "./basecampmodel.js";
import { RegistrasiPendakian } from "./registrasimodel.js";
import { AnggotaPendakian } from "./anggota_pendakian.js";
import { Pembayaran } from "./pembayaran.js";
import Favorit from "./favoritmodel.js"; // default export

const models = {
  User,
  Gunung,
  Basecamp,
  RegistrasiPendakian,
  AnggotaPendakian,
  Pembayaran,
  Favorit,
};

// Setup associations
Object.values(models).forEach(model => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

// Sinkronisasi database (opsional)
(async () => {
  try {
    await db.sync({ alter: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

// Export named exports saja
export {
  User,
  Gunung,
  Basecamp,
  RegistrasiPendakian,
  AnggotaPendakian,
  Pembayaran,
  Favorit,
  db,
};

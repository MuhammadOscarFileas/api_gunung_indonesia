import { Sequelize } from "sequelize";

// Nyambungin db ke BE
const db = new Sequelize("kudaki_a1", "root", "collab_db", {
  host: "104.154.136.127",
  dialect: "mysql",
});

export default db;

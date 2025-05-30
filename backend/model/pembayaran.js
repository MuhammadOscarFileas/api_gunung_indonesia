import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const Pembayaran = db.define(
    "pembayaran",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        registrasi_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        metode_pembayaran: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status_pembayaran: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

Pembayaran.associate = (models) => {
    // Many-to-one relationship with RegistrasiPendakian
    Pembayaran.belongsTo(models.RegistrasiPendakian, { foreignKey: "registrasi_id" });
};

(async () => {
    await db.sync();
})();

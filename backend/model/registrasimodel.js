// models/registrasiPendakian.js
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const RegistrasiPendakian = db.define(
    "registrasi_pendakian",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        basecamp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_orang: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        harga_idr: {
            type: DataTypes.INTEGER,  // Harga dalam IDR
            allowNull: false
        },
        harga_mata_uang: {
            type: DataTypes.INTEGER,  // Harga terkonversi ke mata uang yang dipilih
            allowNull: true
        },
        mata_uang: {
            type: DataTypes.STRING(3),  // Kode mata uang (misalnya USD, EUR)
            allowNull: true
        },
        registrasi_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        status: {
            type: DataTypes.STRING(50),  // Status pendakian (pending, confirmed, canceled)
            allowNull: false
        },
        status_pembayaran: {
            type: DataTypes.STRING(50),  // Status pembayaran (pending, completed, failed)
            allowNull: false
        },
        barcode: {
            type: DataTypes.STRING(255),  // Kode unik untuk barcode
            allowNull: true
        }
    },
    {
        freezeTableName: true
    }
);

RegistrasiPendakian.associate = (models) => {
    // Many-to-one relationship with User
    RegistrasiPendakian.belongsTo(models.User, { foreignKey: "user_id" });

    // Many-to-one relationship with Basecamp
    RegistrasiPendakian.belongsTo(models.Basecamp, { foreignKey: "basecamp_id" });

    // One-to-many relationship with AnggotaPendakian
    RegistrasiPendakian.hasMany(models.AnggotaPendakian, { foreignKey: "registrasi_id" });

    // One-to-one relationship with Pembayaran
    RegistrasiPendakian.hasOne(models.Pembayaran, { foreignKey: "registrasi_id" });
};

(async () => {
    await db.sync();
})();

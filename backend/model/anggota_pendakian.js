import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const AnggotaPendakian = db.define(
    "anggota_pendakian",
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
        nama_lengkap: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nik: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

AnggotaPendakian.associate = (models) => {
    // Many-to-one relationship with RegistrasiPendakian
    AnggotaPendakian.belongsTo(models.RegistrasiPendakian, { foreignKey: "registrasi_id" });
};

(async () => {
    await db.sync();
})();

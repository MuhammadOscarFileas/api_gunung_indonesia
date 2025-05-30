import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const User = db.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        saldo: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        }
    },
    {
        freezeTableName: true
    }
);

User.associate = (models) => {
    // One-to-many relationship with RegistrasiPendakian
    User.hasMany(models.RegistrasiPendakian, { foreignKey: "user_id" });
};

(async () => {
    await db.sync();
})();

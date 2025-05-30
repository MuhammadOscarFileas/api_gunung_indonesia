import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const Basecamp = db.define(
    "basecamp",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        gunung_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        elevation: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price_weekday: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price_weekend: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        camping_fee: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        freezeTableName: true
    }
);

Basecamp.associate = (models) => {
    // Many-to-one relationship with Gunung
    Basecamp.belongsTo(models.Gunung, { foreignKey: "gunung_id" });

    // One-to-many relationship with RegistrasiPendakian
    Basecamp.hasMany(models.RegistrasiPendakian, { foreignKey: "basecamp_id" });
};

(async () => {
    await db.sync();
})();

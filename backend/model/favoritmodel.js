// models/favorit.js
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Favorit = db.define(
    "favorit",
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
        gunung_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        freezeTableName: true
    }
);

Favorit.associate = (models) => {
    // Many-to-one relationship with User
    Favorit.belongsTo(models.User, { foreignKey: "user_id" });

    // Many-to-one relationship with Gunung
    Favorit.belongsTo(models.Gunung, { foreignKey: "gunung_id" });
};

export default Favorit;

(async () => {
    await db.sync();
})();

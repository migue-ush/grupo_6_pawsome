module.exports = (sequelize, dataTypes) => {
    let alias = 'Bill';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        deleted_at: {
            type: dataTypes.DATE
        },
        date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        expiry: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        }
    }

    let config = {
        tableName: 'bills',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Bill = sequelize.define(alias, cols, config);

    return Bill

};
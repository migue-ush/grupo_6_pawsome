module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_bill';

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
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_bill: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        id_product: {
            type: dataTypes.STRING,
            allowNull: false,
            foreignKey: true,
        }
    };

    let config = {
        tableName: 'product_bills',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Product_bill = sequelize.define(alias, cols, config);

    return Product_bill

};
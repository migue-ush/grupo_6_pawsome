module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';

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
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        tableName: 'brands',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Brand = sequelize.define(alias, cols, config);

   /* Brand.associate = (models) => {
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'id_brand'
        })
    
    }*/
    return Brand

};
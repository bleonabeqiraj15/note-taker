module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailToken: {
            type: DataTypes.STRING,
        },
        isVerified: {
            type: DataTypes.BOOLEAN
        },
        resetLink: {
            type: DataTypes.STRING,
            default: ""
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Notes, {
            onDelete: "cascade"
        })
    }


    return Users;
}
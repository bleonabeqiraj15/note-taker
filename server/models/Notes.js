module.exports = (sequelize, DataTypes) => {

    const Notes = sequelize.define("Notes", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // user: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    })

    return Notes;
}

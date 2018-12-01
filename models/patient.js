module.exports = (sequelize, DataTypes) => {
    var Patient = sequelize.define('Patient', {
          name_first: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
          // len: [35]
        }
      },
        name_last: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // len: [35]
        }
      }
    });

    Patient.associate = models => {
      Patient.hasMany(models.Rx, {
        onDelete: "cascade"
      });
    };
  
    return Patient;
  };
  
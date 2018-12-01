module.exports = (sequelize, DataTypes) => {
    var Rx = sequelize.define('Rx', {
        rx_num: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        drug_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ndc: {
            type: DataTypes.STRING,
        },
        refills: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dispensed_qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.STRING
        },
        perDay: {
            type: DataTypes.STRING
        },
        time_of_day: {
            type: DataTypes.STRING
        },
        sig: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.STRING
        },
        pharmacist: {
            type: DataTypes.STRING
        },
        pharmacy_number: {
            type: DataTypes.STRING
        },
        prescriber: {
            type: DataTypes.STRING
        },
        prescriber_number: {
            type: DataTypes.STRING
        },
        PatientId: {
            type: DataTypes.INTEGER
        }
   });

    return Rx;
  };

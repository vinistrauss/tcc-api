import Sequelize, { Model } from 'sequelize';

class Teacher extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Class, { foreignKey: 'classes_id', as: 'class' });
    }
}

export default Teacher;

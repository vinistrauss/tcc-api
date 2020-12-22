import Sequelize, { Model } from 'sequelize';

class Class extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                classroom: Sequelize.STRING,
                day_week: Sequelize.INTEGER,
                start_hour: Sequelize.STRING,
                end_hour: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Teacher, {
            foreignKey: 'teacher_id',
            as: 'teachers',
        });
    }
}

export default Class;

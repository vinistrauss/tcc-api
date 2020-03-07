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
}

export default Class;

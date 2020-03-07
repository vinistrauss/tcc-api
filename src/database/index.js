import Sequelize from 'sequelize';

import Class from '../app/models/Class';
import Teacher from '../app/models/Teacher';

import databaseConfig from '../config/database';

const models = [Class, Teacher];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();

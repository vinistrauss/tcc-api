import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Class from '../app/models/Class';
import Teacher from '../app/models/Teacher';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Class, Teacher, User];

class Database {
    constructor() {
        this.init();
        this.mongo();
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

    mongo() {
        this.mongoConnection = mongoose.connect(
            `mongodb://${process.env.DB_MONGO}:27017/questions`,
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            }
        );
    }
}

export default new Database();

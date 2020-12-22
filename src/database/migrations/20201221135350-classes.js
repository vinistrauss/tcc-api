module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('classes', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            teacher_id: {
                type: Sequelize.INTEGER,
                references: { model: 'teachers', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            classroom: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            day_week: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            start_hour: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            end_hour: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('classes');
    },
};

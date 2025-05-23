// Пример корректной миграции
module.exports = {
  async up(queryInterface, Sequelize) {
    // <-- Обратите внимание на параметры
    await queryInterface.createTable('NewTable', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('NewTable')
  },
}

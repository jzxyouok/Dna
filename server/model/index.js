/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';

const Sequelize = require('sequelize');
const config = require('../../config/env');

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  timezone: '+08:00', //设置时区
  benchmark: true     //在打印执行的SQL日志时输出执行时间（毫秒）
});
const db = {};

/**
 * 注册model,方便IDE感知
 */
//sys
db.Dictionary = sequelize.import('./Dictionary');
db.DictionaryMx = sequelize.import('./DictionaryMx');
db.Sequences = sequelize.import('./Sequences');
db.User = sequelize.import('./User');
db.Role = sequelize.import('./Role');
db.UserRole = sequelize.import('./UserRole');
db.Menu = sequelize.import('./Menu');
db.RoleMenu = sequelize.import('./RoleMenu');
db.Rights = sequelize.import('./Rights');
db.RoleRights = sequelize.import('./RoleRights');

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const modalNames = [
//   'Sequences',
//   'Dictionary',
//   'DictionaryMx',
//   'User',
//   'Role',
//   'UserRole',
//   'Permission',
//   'RolePermission',
//   'Operation',
//   'OperationPermission',
//   'Menu',
//   'MenuPermission'
// ];
//
// modalNames.forEach(name => {
//   db[name] = require(`./${name}`)(sequelize, Sequelize);
// });

// const fs = require("fs");
// fs.readdirSync(__dirname)
//   .filter(function (file) {
//     return (file.indexOf(".") !== 0) && (file !== "index.js");
//   })
//   .forEach(function (file) {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });


// db.TeacherRecord.findOne({ include: { model: db.Teacher } }).then(result=>console.log(JSON.stringify(result)));

//
// db.DictionaryMx.findAll({
//   where: {
//     '$dictionary.code$': 'abc'
//   },
//   include: { model: db.Dictionary }
// }).then(result=> {
//   console.log(result);
// });


/*
 models.User.findAll({
 where: {
 '$Task.title$': { '$like': 't1' }
 },
 include: [{
 model: models.Task
 }]
 }).then(function (users) {
 console.log(users[0].taskName)
 res.render('index', {
 title: 'Express',
 users: users
 });
 });
 */

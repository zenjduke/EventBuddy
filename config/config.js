module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "EventBuddy",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    'host': process.env.HOST,
    "dialect": "mysql"
  }
};

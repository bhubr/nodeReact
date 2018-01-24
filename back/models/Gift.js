const mysql = require('promise-mysql');

pool = mysql.createPool({
  host: 'localhost',
  user: 'santa',
  password: 'JingleBells@@1225',
  database: 'santa_gifts',
  connectionLimit: 10
});

const Gift = {

  readAll: function() {
    return  pool
      .query('select `id`, `name` from gifts');
  },

  create: function(name) {
    const insertQuery = "insert into gifts(name) values('" + name.trim() + "')";
    let selectQuery = "select `id`, `name` from gifts where id = ";
    return pool
      .query(insertQuery)
      .then(result => pool.query(selectQuery + result.insertId))
      .then(records => (records[0]));
  },

  delete: function(id) {
    const deleteQuery = 'delete from gifts where id = ' + id;
    return pool
      .query(deleteQuery);
  }
};

module.exports = Gift;

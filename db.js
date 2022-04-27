var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'metastonksdev.mysql.database.azure.com',
  user     : 'metastonks',
  password : 'Panamericana22.',
  database : 'development'
});
 
/* 
connection.connect();

connection.query('SELECT * FROM users', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();
*/

exports.my_connection = connection;

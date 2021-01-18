let mysql = require('mysql2/promise');


async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Welcome1234',
        database: 'world'
    });
    console.log('Connected to Mysql!');
    global.connection = connection;
    return global.connection;
}

async function selectCountries(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT name, Region, Population, HeadOfState FROM country;');
    return rows;
}

module.exports = { selectCountries }
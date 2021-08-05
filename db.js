let mysql = require('mysql2/promise');


async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    const connection = mysql.createConnection({
        host: '192.168.0.24',
        port: 3306,
        user: 'demo',
        password: 'Welcome1234',
        database: 'world'
    });
    console.log('Connected to Mysql!');
    global.connection = connection;
    return global.connection;
}

async function selectCountries(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT name, code, Region, Population, HeadOfState FROM country ORDER BY name;');
     
    return rows;
}

async function selectCountry(code){
    const conn = await connect();
    const [rows] = await conn.query('SELECT name, code, Region, Population, HeadOfState FROM country WHERE code = ?', code);
    return rows && rows.length > 0 ? rows[0]:{};
}

async function updateCountry(code, country){
    let sql = 'UPDATE country SET';
    const props = Object.entries(country);
    for (let i = 0; i < props.length; i++) {
        const item = props[i];
        
        if (i === props.length - 1) { // if last element
            sql += ` ${item[0]}=? WHERE code=?`;
        }
        else{
            sql += ` ${item[0]}=?,`;
        }
    }
    let values = props.map(p => p[1]);
    
    values.push(code);
    try {
        const conn = await connect();
        return await conn.query(sql, values);
    } catch (error) {
        console.log(error.message);
    }     
}

async function insertCountry(body){
    const props = Object.entries(body);

    let sql = 'INSERT INTO country (';
    let valuePlaceholder = '';
    for (let i = 0; i < props.length; i++) {
        const item = props[i];        

        if (i === props.length - 1) { // if last element
            sql += ` ${item[0]}) VALUES (`;
            valuePlaceholder += '?)';
        }
        else{
            sql += ` ${item[0]},`;
            valuePlaceholder += '?,';
        }
    }
    sql += valuePlaceholder;
    const values = props.map(p => p[1]);

    const conn = await connect();
    return await conn.query(sql, values);
    
}

async function deleteCountry(code){
    const conn = await connect();

    await conn.query('DELETE FROM city WHERE CountryCode = ?;', code)
    await conn.query('DELETE FROM language WHERE CountryCode = ?;', code)
    
    let sql = 'DELETE FROM country WHERE code = ?;'
    
    return await conn.query(sql, code);
}
module.exports = { selectCountries, selectCountry, updateCountry, insertCountry, deleteCountry }
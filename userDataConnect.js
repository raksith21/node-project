const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const importPath = require('path');
require('dotenv').config();
const app = express();
const port = 3000;


// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'Raks@2002',
//     port: 5432,
// });
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
});


async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase();

app.set('view engine', 'ejs');
app.set('views', importPath.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    let readData = req.query;
    if (readData.action === 'Read') {
        console.log('In read.....');
        let readQuery = `SELECT id, name, degree, course, age FROM users WHERE id = ${readData.id}`;

        async function queryString(readQuery) {
            try {
                const result = await client.query(readQuery);
                return result.rows[0];
            } catch (error) {
                console.error(error);
            }
        }

        async function dataDisplay(readQuery) {
            var x = await queryString(readQuery);
            return x;
        }

        const returnedProm = dataDisplay(readQuery);
        console.log(returnedProm);

        returnedProm.then((x) => {
            console.log('last check...', x);
            res.render('displayData', { title: 'Display Data', userData : x});
        });
    } 
    else {
        res.render('userData', { title: 'Express with EJS' });
    }
});


app.post('/', (req, res) => {
    res.render('userData', { title: 'Express with EJS' });
    console.log("IN POST.....");
    var formData = req.body;
    if (formData.action === 'Create') {
        const insertQuery = `INSERT INTO users (id, name, degree, course, age) VALUES (${formData.id}, '${formData.name}', '${formData.degree}', '${formData.course}', ${formData.age})`;

        console.log(insertQuery);

        client.query(insertQuery, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data inserted successfully:', result);
        });
    }
    res.render('userData', { title: 'Express with EJS' });
});

app.post('/delete', (req,res)=>{
    let deleteId = req.body;
    console.log('In delete.....')
    if(deleteId.action == 'Delete'){
        const deleteQuery = `DELETE FROM users WHERE id = ${deleteId.id}`
        
        client.query(deleteQuery, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data deleted successfully:', result);
        });
    }
    res.render('userData', { title: 'Express with EJS' });
})

app.get('/update',(req,res)=>{
    console.log('In get Update...')
    let readData = req.query;
    if (readData.action === 'Update') {
        let updateQuery = `SELECT id, name, degree, course, age FROM users WHERE id = ${readData.id} LIMIT 1`;

        async function queryString(updateQuery) {
            try {
                const result = await client.query(updateQuery);
                return result.rows[0];
            } catch (error) {
                console.error(error);
            }
        }

        async function dataDisplay(updateQuery) {
            var x = await queryString(updateQuery);
            return x;
        }

        const returnedProm = dataDisplay(updateQuery);
        console.log(returnedProm);

        returnedProm.then((x) => {
            res.render('updateData', { title: 'Express with EJS' ,updateData : x});
        });
    } 
    else {
        res.render('userData', { title: 'Express with EJS' });
    }
})

app.get('/update/values', (req,res)=>{
    console.log("IN update/values....")
    let updateData = req.query;
    const updateQuery = `UPDATE users SET name = '${updateData.name}', age = ${updateData.age}, degree = '${updateData.degree}', course = '${updateData.course}'
                        WHERE id = ${updateData.id}`
    console.log("Update query....", updateQuery)
    client.query(updateQuery, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data updated successfully:', result);
    });
    res.render('userData', { title: 'Express with EJS' });

})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



// const { Client } = require('pg');
// const dotenv = require('dotenv');

// // Load environment variables from a .env file
// dotenv.config();

// // Connect to PostgreSQL
// const client = new Client({
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD
// });

// client.connect();

// // Perform database operations
// // ...

// // Close the connection
// client.end();


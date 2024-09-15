const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'people'
};

function getRandomName() {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'Chris', 'Anna', 'David', 'Sophia', 'Robert', 'Isabella'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
  
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
    return `${randomFirstName} ${randomLastName}`;
  }

app.get('/', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute('SELECT name FROM people');

  const randomName = getRandomName();
  
  await connection.execute('INSERT INTO people(name) VALUES (?)', [randomName]);

  let namesList = '<ul>';
  rows.forEach(row => {
    namesList += `<li>${row.name}</li>`;
  });
  namesList += '</ul>';
  
  res.send(`<h1>Full Cycle Rocks!</h1> ${namesList}`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
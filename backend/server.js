const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ai_learning_analytics'
});
db.connect((err) => {
    if (err) console.error('Database connection failed:', err);
    else console.log('Connected to MySQL');
});
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});
app.get('/students-at-risk', (req, res) => {
    const sql = `
        SELECT students.full_name, AVG(exam_results.score) AS average_score
        FROM exam_results
        JOIN students ON exam_results.student_id = students.student_id
        GROUP BY students.student_id
        HAVING average_score < 50
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
const sql = require('mysql');

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "amatuungo_aid"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database");
});

module.exports = db;
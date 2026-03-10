const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/menu", (req, res) => {
    pool.query("SELECT  * FROM menu", (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result.rows);
        }
    })
})

module.exports = router;
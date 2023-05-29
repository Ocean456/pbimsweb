import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from "body-parser";
import fs from 'fs';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'demo',
    password: '12345',
    database: 'information'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const logFile = 'log.txt';

function logToFile(log) {
    fs.appendFile(logFile, `${log}\n`, (err) => {
        if (err) {
            console.error('无法写入日志文件:', err);
        }
    });
}

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    const sql = 'SELECT * FROM web WHERE username = ? AND password = ?';
    const params = [username, password];
    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器内部错误');
        } else if (result.length === 0) {
            logToFile(`登录失败 - 用户名: ${username}`);
            res.status(401).send('用户名或密码不正确');
        } else {
            const user = result[0];
            logToFile(`登录成功 - 用户名: ${username}`);
            res.status(200).json({
                id: user.id,
                username: user.username,
            });
        }
    });
});

app.get('/api/search/:id?', (req, res) => {
    const id = req.params.id;
    let sql = 'select card_id, name, address, gender, nationality from information';
    let params = [];

    if (id) {
        sql += ' where card_id like ?';
        params = [`${id}%`];
    }

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器内部错误');
        } else {
            res.send(result);
        }
    });

    logToFile(`GET /api/search/:id - ID: ${id || 'All'}`);
});

app.delete('/api/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM information WHERE card_id=?';
    const params = [id];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({message: '删除失败', error: err});
        } else {
            if (result.affectedRows > 0) {
                res.json({message: '删除成功'});
            } else {
                res.status(404).json({message: '删除失败：记录不存在'});
            }
        }
    });
    logToFile(`DELETE /api/delete/:id - ID: ${id}`);
});

app.post('/api/add', (req, res) => {
    const {id, name, gender, address, nationality} = req.body;
    const sql = 'INSERT INTO information (card_id, name, gender, nationality, address) VALUES (?, ?, ?, ?, ?)';
    const params = [id, name, gender, nationality, address];

    connection.query(sql, params, (err) => {
        if (err) {
            console.error(`添加数据失败：${err}`);
            res.status(500).json({message: '添加数据失败', error: err});
        } else {
            console.log(`添加数据成功.`);
            res.status(200).json({message: '添加数据成功'});
        }
    });

    logToFile('POST /api/add');
});

app.put('/api/edit', (req, res) => {
    const {card_id, name, gender, address, nationality} = req.body;
    const sql = 'UPDATE information SET name=?, gender=?, address=?, nationality=? WHERE card_id=?';
    const params = [name, gender, address, nationality, card_id];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error(`编辑失败：${err}`);
            res.status(500).json({message: '编辑失败', error: err});
        } else {
            if (result.affectedRows > 0) {
                console.log(`编辑成功.`);
                res.json({message: '编辑成功'});
            } else {
                console.log(`编辑失败：记录不存在.`);
                res.status(404).json({message: '编辑失败：记录不存在'});
            }
        }
    });

    logToFile('PUT /api/edit');
});

const baseUrl = 'http://localhost:3000/api';

function logEndpoint(endpoint) {
    console.log(`${endpoint}: ${baseUrl}${endpoint}`);
}

app.listen(3000, () => {
    logEndpoint('/search');
    logEndpoint('/delete');
    logEndpoint('/add');
    logEndpoint('/edit');

    logToFile('Server started');
});

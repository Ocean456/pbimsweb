import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import bodyParser from "body-parser";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'demo',
    password: '12345',
    database: 'information'
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/search', (req, res) => {
    const sql = 'select card_id,name,address,gender,nationality from information'
    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).send('服务器内部错误')
        } else {
            res.send(result)
        }
    })
})
app.get('/api/search/:id', (req, res) => {
    const id = req.params.id
    const sql = 'select card_id,name,address,gender,nationality from information where card_id like ?'
    const params = [`${id}%`]
    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).send('服务器内部错误')
        } else {
            res.send(result)
        }
    })
})
app.delete('/api/delete/:id', (req, res) => {
    const card_id = req.params.id;
    const sql = 'delete from information where card_id=?'
    connection.query(sql, [card_id], (err) => {
        if (err) {
            console.log(err)
            res.status(500).json({message: '删除失败'})
        } else {
            res.json({message: '删除成功'})
        }
    })
})
app.post('/api/add', (req, res) => {
    const {id, name, gender, address, nationality} = req.body;
    const sql = 'insert into information values (null,?,?,null,?,?,?,null,null,null,null,null,null,null,null,null,null,null,null)'
    connection.query(sql, [id, name, gender, nationality, address], (err) => {
        if (err) {
            console.log(`添加数据失败：${err}`)
            res.status(500).send('添加数据失败')
        } else {
            console.log(`添加数据成功.`);
            res.status(200).send('添加数据成功')
        }
    })
})
app.put('/api/edit', (req, res) => {
    const {card_id, name, gender, address, nationality} = req.body;
    const sql = 'update information set name=?,gender=?,address=?,nationality=? where card_id=?'
    connection.query(sql, [name, gender, address, nationality, card_id], (err) => {
        if (err) {
            console.log(`编辑失败：${err}`)
            res.status(500).json({message: '编辑失败'})
        } else {
            console.log(`编辑成功.`);
            res.json({message: '编辑成功'})
        }
    })

})

app.listen(3000, () => {
    console.log('Query : http://localhost:3000/api/search')
    console.log('Delete : http://localhost:3000/api/delete')
    console.log('Add : http://localhost:3000/api/add')
    console.log('Edit : http://localhost:3000/api/edit')
})

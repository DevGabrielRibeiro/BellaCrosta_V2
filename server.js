const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(cors());

// Servir arquivos estáticos da pasta 'project'
app.use(express.static(__dirname));

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // altere para seu usuário
    password: '', // altere para sua senha
    database: 'db_bellacrosta'
});

// Rota para buscar o cardápio
app.get('/api/cardapio', (req, res) => {
    db.query('SELECT * FROM tb_cardapio', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        // Caminho da imagem para a pasta img
        const pizzas = results.map(row => ({
            nome: row.nome,
            ingredientes: row.ingredientes,
            valor: row.valor,
            imagem: row.imagem ? `/img/${row.imagem}` : ''
        }));
        res.json(pizzas);
    });
});

app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
});

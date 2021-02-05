import express from 'express'; 
// Quando usamos typescript precisamos passar também a definição de tipos

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');
    // response.json({ retorna um objeto aqui ou um array também});
    response.json([
        'Diego',
        'Cleiton',
        'Robson',
        'Daniel'
    ])
});

app.listen(3333);

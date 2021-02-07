// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema 

// GET: Buscar uma ou mais informações do nosso back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informação do back-end

// POST http://localhost:3333/users = Criar um usuário
// GET http://localhost:3333/users = Listar usuários
// GET http://localhost:3333/users/5 = Buscar dados do usário com ID 5

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros geralmente opcionais que servem para filtrar ou paginação
// Request Body: Parâmetros para criação/atualização de informações.
// const users = [ 
//     'Diego', //0
//     'Cleiton', //1
//     'Robson', //2 
//     'Daniel' //3
// ];

// app.get('/', (request, response) => {
//    return response.json({ message: 'Hello World'});
// });

// app.get('/users/:id', (request, response) => {
//     const id = Number(request.params.id);

//     const user = users[id];

//     return response.json(user);
// }); //: significa que você recebe um parâmetro

// app.post('/users', (request, response) => {
//     const data = request.body;

//     console.log(data);
//     const user = {
//         name: data.name,
//         email: data.email
//     };

//     return response.json(user);
// }); //quero criar um usuário

import express from 'express';
import routes from './routes';
import path from 'path';
// Quando usamos typescript precisamos passar também a definição de tipos
const app = express();

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.listen(3333);

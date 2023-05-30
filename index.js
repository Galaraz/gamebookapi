const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BookRoute = require('./routes/BookRoute');
const LoginRoute = require('./routes/LoginRoute');

const SUCCESS = 200;
const PORT = '3000';

const Middlewares = require('./middleware');

const middlewaresCrush = [
  Middlewares.nameMiddleware,
  Middlewares.ageMiddleware,
  Middlewares.dateMiddleware,
  Middlewares.validDateMiddleware,
  Middlewares.validRateMiddleware,
];

const app = express();
app.use(bodyParser.json());
// Configuração do CORS
app.use(cors());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.text(SUCCESS).send();
});

app.post('/login', Middlewares.emailMiddleware, Middlewares.passwordMiddleware);
app.post('/book');
app.get('/book');
app.get('/book/search', Middlewares.authMiddleware);
app.put('/book/:id', Middlewares.authMiddleware, middlewaresCrush);
app.delete('/book/:id', Middlewares.authMiddleware);

app.use('/login', LoginRoute);
app.use('/book', BookRoute);



app.listen(PORT, () => {
  console.log(`Aplicação Online rodando na Porta ${PORT}`);
});
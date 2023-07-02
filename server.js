const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('./config/connect')

const app=express()

app.use(cors());
app.use(morgan('dev'));// morgan('dev') morgan('tiny') morgan('combiner')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
 res.json({ message: 'hello word' });
});

// app.get('/', async (req, res) => {  res.send(app.get('env')) }); nchoufou project mode dev ou production

app.use('/todo', require('./routers/todo'))
app.use('/user', require('./routers/user'))
app.use('/auth', require('./routers/auth'))
app.use('/image',express.static('./uploads'))







app.listen(3000,()=>{
    console.log('server work !!');
})
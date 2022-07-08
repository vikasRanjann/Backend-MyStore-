const { request, response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./config');
const jwt = require('jsonwebtoken');
const utils = require('./utils')

//connect to mongoose server
mongoose.connect(config.dbConnection)
const app = express();
app.use(bodyParser.json())  
app.use(cors('*'))  

app.use((request,response,next)=>{

     if(
          (request.url == '/admin/signup')||
          (request.url == '/admin/signin'))
     {
          next();
     }
     else{
          try{

          const token = request.headers['token']
          if(!token)
          {
               response.send(utils.createResult('unauthorized'))
               return;
          }
          const payload= jwt.verify(token,config.secret)
          request.userId = payload.Id
          next();
          }
          catch(ex)
          {
               response.send(utils.createResult('unauthorized'))

          }


     }
})
//routers
const routerProduct = require('./routes/products')
const routerCategory = require('./routes/categories')
const routerOrder = require('./routes/orders')
const routerUser = require('./routes/users')
const routerAdmin = require('./routes/admins')



//appRouterUse
app.use('/product',routerProduct)
app.use('/category',routerCategory)
app.use('/order',routerOrder)
app.use('/user',routerUser)
app.use('/admin',routerAdmin)

app.get('/', (request,response) => {

     response.send('Welcome to WebApi')
})

app.listen(4000,'0.0.0.0',()=>(
     console.log(`Application started`)
     

))
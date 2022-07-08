const { Router } = require('express');
const express = require('express');
const Category = require('../models/category')
const utils = require('../utils')

const router = express.Router();

router.post('/',(request,response)=>{

     const{title,description}  = request.body;

     const category = new Category()
     category.title = title;
     category.description = description;

     category.save((error,category)=>{
          response.send(utils.createResult(error,category));
     })

  
     
})


//category get data
router.get('/',(request,response)=>{

     Category
     .find({deleted: false},{__v:0,isActive:0,createdTimestamp:0,deleted:0})
     .exec((error,category)=>{
          response.send(utils.createResult(error,category));


     })
     
})

// modify category data
router.put('/:id',(request,response)=>{

     const{id} = request.params
     const {title, description} = request.body
     Category
     .findOne({_id : id, deleted:false})
     .exec((error,category)=>{

          if(error) 
          {
               response.send(utils.createResult(error,null));

          }
          else if(!category)
          {
               response.send(utils.createResult('category not found',null));
          }
          else
     {
          category.title = title;
          category.description = description;
          category.save((error,category)=>{
               response.send(utils.createResult(error,category));
          }) 
     }    
     })



})

router.delete('/:id',(request,response)=>{

     const{id} = request.params
     
     Category
     .findOne({_id:id})
     .exec((error,category)=>{

          if(error) 
          {
               response.send(utils.createResult(error,null));

          }
          else if(!category)
          {
               response.send(utils.createResult('category not found',null));
          }
          else
     {
          category.deleted = true;
         
          category.save((error,category)=>{
               response.send(utils.createResult(error,category));
          }) 
     }    
     })
})

module.exports = router
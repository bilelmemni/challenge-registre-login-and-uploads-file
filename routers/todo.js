const express=require('express');
const Todo=require('../models/todo');
const router=express.Router()


//CRUD Todo
router.post('/add',async(req,res)=>{
    data=req.body;
    usr=new Todo(data);
     usr.save()
     .then(
        (saved)=>{
            res.send(saved)
        }
     )
     .catch(
        (err)=>{
            res.send(err)
        }
     )

});

router.get('/getall',(req,res)=>{
    Todo.find()
    .then(
        (Todos)=>{
          res.send(Todos)
        }
    )
    .catch(
        (err)=>{
        console.log(err);
        }
    )
});


router.get('/getById/:id',(req,res)=>{
  myid=req.params.id
  Todo.findOne({_id:myid})
  .then(
    (todo)=>{
        res.send(todo)
        
    }
  )
  .catch(
    (err)=>{ 
      res.send(err)
    }
  )
})

router.delete('/delete/:id',(req,res)=>{
    myid=req.params.id
    Todo.findOneAndDelete({_id:myid})
    .then(
        (deletetodo)=>{
          res.send(deletetodo)
        }
    )
    .catch(
        (err)=>{
           res.send(err)
        }
    )

});

router.put('/update/:id',(req,res)=>{
    myid=req.params.id;
    newdata=req.body;
    Todo.findOneAndUpdate({_id:myid},newdata)
    .then(
        (updatetodo)=>{
           res.send(updatetodo)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})


module.exports=router
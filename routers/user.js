const express=require('express');
const User=require('../models/user');
const router=express.Router()

router.post('/add',async(req,res)=>{
    data=req.body;
    usr=new User(data);
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
    User.find()
    .then(
        (Users)=>{
          res.send(Users)
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
  User.findOne({_id:myid})
  .then(
    (User)=>{
        res.send(User)
        
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
    User.findOneAndDelete({_id:myid})
    .then(
        (deleteUser)=>{
          res.send(deleteUser)
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
    User.findOneAndUpdate({_id:myid},newdata)
    .then(
        (updateUser)=>{
           res.send(updateUser)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})


module.exports=router
const express=require('express');
const Auth=require('../models/auth');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
const router=express.Router()
require('dotenv').config()

const multer=require('multer');
filename='';
const mystorage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,redirect)=>{
           let date=Date.now()
           let fl=date+'.'+file.mimetype.split('/')[1];
           redirect(null,fl);
           filename=fl;
    }
})
const upload=multer({storage:mystorage})




//CRUD Auth registre and login
router.post('/registre',upload.any('image'),(req,res)=>{

    data=req.body;
    auth= new Auth(data);
    auth.image=filename;
    salt=bcrypt.genSaltSync(10)
    auth.Password=bcrypt.hashSync(data.Password,salt)
    auth.save()
    .then(
        (save)=>{
            filename=''
            res.status(200).send(save)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})
var secretkey=process.env.SEKRET_KEY
router.post('/login' , (req, res)=>{
 
    let data = req.body;
    Auth.findOne({Email: data.Email})
        .then(
            (author)=>{
                let valid = bcrypt.compareSync(data.Password , author.Password);
                if(!valid){
                    res.send('email or password invalid');
                }else{

                    let payload = {
                        _id: author._id,
                        Email: author.Email,
                        fullname: author.Firstname + ' ' + author.Lastname
                    }

                    let token = jwt.sign(payload , secretkey);

                    res.send({ myToken: token })

                }

            }


        )
        .catch(
            err=>{
                res.send('email or password invalid');
            }
        )



})
router.get('/getById/:id',(req,res)=>{
  myid=req.params.id
  Auth.findOne({_id:myid})
  .then(
    (Auth)=>{
        res.send(Auth)
        
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
    Auth.findOneAndDelete({_id:myid})
    .then(
        (deleteAuth)=>{
          res.send(deleteAuth)
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
    Auth.findOneAndUpdate({_id:myid},newdata)
    .then(
        (updateAuth)=>{
           res.send(updateAuth)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})


module.exports=router
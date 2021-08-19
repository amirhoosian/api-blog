const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer')
//route path 
const user = require('./router/user')
const auth = require('./router/auth');
const category = require('./router/category')
const Post = require('./router/post')

const app = express();

dotenv.config()

// Middlewares

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    }).then(console.log('conected to db')).catch(error => console.log(error))



const stroge = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'images')
    }, fileName: (req,file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})
app.post('/api/upload' ,upload.single("file") ,(req , res)=>{

   res.status(200).json('uploaded')

})

// Routes
app.use('/api/auth' , auth);
app.use('/api/user' ,user);
app.use('/api/post', Post)
app.use('api/catgoris' ,category)



const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`api Started at Port ${PORT}
=> http://localhost:${PORT}`))
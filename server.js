var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
const Promise = require('bluebird')  ;
const AppDAO = require('./dao');
const Form = require('./app/models/Form');

const dao = new AppDAO('./db/jmp.db');
const form = new Form(dao);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    //res.json({ message: 'JMP, forms' });   
       form.getAll()
        .then((data)=>{
            var list = form.list(data);
            console.log(JSON.stringify(list));
            res.json(list);
        })
        .catch((err) => {
            console.log('Error: ');
            console.log(JSON.stringify(err));
            res.json(err);
        });
});
router.delete('/:id', function(req, res) {
    const id = req.params.id;   
    console.log("Delete form with id "+id);
       form.delete(id)
        .then((data)=>{
            console.log(JSON.stringify(data));
            res.json(data);
        })
        .catch((err) => {
            console.log('Error: ');
            console.log(JSON.stringify(err));
            res.json(err);
        });
});
router.post('/', function(req, res) {
      const json = req.body; 
      console.log(JSON.stringify(json));
       form.create(json)
        .then((data)=>{
            console.log(JSON.stringify(data));
            res.json(data);
        })
        .catch((err) => {
            console.log('Error: ');
            console.log(JSON.stringify(err));
            res.json(err);
        });
});

app.use('/forms', router);

app.listen(port, ()=>{
    console.log('Server listening at ' + port);
    form.createTable()
    .then((data)=>{
         console.log(JSON.stringify(data));
        console.log("Forms table created/refreshed successfully");
    })
    .catch((err) => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
    });
});

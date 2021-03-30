var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var html = require('html');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(path.join(__dirname ,'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
//console.log("==========")
//console.log(__dirname);
//console.log("==========")

app.get('/', function(req,res)
{
	res.render(__dirname + '\/pages/index.html');
});


    //db connection
   const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'softworth'
   })
    db.connect((error) => {
        if(error){
            console.log(error)
        }
        else {
            console.log("Mysql connected.....")
        }
    })

app.set('port', process.env.PORT || 9000);
app.listen(app.get('port'), '0.0.0.0', function(){
console.log('Express server listening on port ' + app.get('port'));
});
app.post('/search_data',function(req,res){
    var course=req.body.course;

    var sql = 'SELECT * FROM student WHERE COURSES ="' + course + '"';
        db.query(sql,function(err,result) {
        if(err) throw err;
        res.send(result)
        console.log(result)
        })
})

app.post('/submit_course_details',function(req,res){
    var course_name = req.body.course_name;
    var modules = req.body.modules;
    var category = req.body.category;
    var sub_category = req.body.sub_category;
    var status = req.body.status;
    
    var obj = {
        COURSES : course_name, 
        MODULES : modules, 
        CATEGORY : category, 
        SUBCATEGORY : sub_category,
        STATUS : status,
        
}

db.query(`INSERT INTO student  SET ?`,obj,function(err,rows) {
    if(err) {
        res.send(err)
    }
    else {
        res.send(rows)
        //console.log(rows)
    }
 })
});
app.post('/viewing_details',function(req,res){
    //console.log("db")
    
        db.query("SELECT * FROM student", function (err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result)
        });
      });

      app.post('/deleting_details',function(req,res) {
        var id = req.body.id;
       // console.log(id)
        var sql = "DELETE from student where id = ?"
        db.query(sql,id,function(err,result) {
            if (err) throw err;
           // console.log(result);
            res.send(result)
        })
    })

    app.post('/updating_details',function(req,res) {

        var id = req.body.id;
        var sql = "SELECT * FROM student where id = ?"
        db.query(sql,id,function(err,result) {
        if(err) throw err;
        res.send(result)
        })

    })

    app.post('/updating_course_data',function(req,res){
        var id = req.body.id;
        var course=req.body.course;
        var module=req.body.module;
        var category=req.body.category;
        var subcategory=req.body.subcategory;
        var status=req.body.status
        var obj ={
        id : id,
        COURSES : course, 
        MODULES : module, 
        CATEGORY : category, 
        SUBCATEGORY : subcategory,
        STATUS : status
        }
        var sql = "UPDATE student SET ? where id = ?"
        db.query(sql,[obj,id],function(err,result) {
            if(err) throw err;
            res.send(result)
        })
})

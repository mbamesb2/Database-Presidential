var mysql = require('mysql');

var express = require('express');
var app = express();

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'student',
    password        : 'default',
    database        : 'student'
});

module.exports.pool = pool;


app.use(express.static('public'));
app.set('port', 2000);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/createTables', function(req,res){
    pool.query("DROP TABLE IF EXISTS President", function(err){
        var createString = "CREATE TABLE President(" +
        "id INT PRIMARY KEY AUTO_INCREMENT," +
        "name VARCHAR(255) NOT NULL," +
        "age INT NOT NULL," +
        "year INT NOT NULL," +
        "term INT NOT NULL)"
        pool.query(createString, function(err){
            console.log("President created");
    });
  });
  pool.query("DROP TABLE IF EXISTS Vice_President", function(err){
        var createString = "CREATE TABLE Vice_President(" +
        "vice_id INT PRIMARY KEY AUTO_INCREMENT," +
        "vice_name VARCHAR(255) NOT NULL," +
        "vice_age INT NOT NULL)"
        pool.query(createString, function(err){
            console.log("Vice President created");
    });
  });  

  pool.query("DROP TABLE IF EXISTS Party", function(err){
        var createString = "CREATE TABLE Party(" +
        "party_id INT PRIMARY KEY AUTO_INCREMENT," +
        "party_name VARCHAR(255) NOT NULL)"
        pool.query(createString, function(err){
            console.log("Party created");
    });
  });
  pool.query("DROP TABLE IF EXISTS Person_Party", function(err){
        var createString = "CREATE TABLE Person_Party(" +
        "pres_id INT PRIMARY KEY AUTO_INCREMENT," +
        "party_id INT PRIMARY KEY AUTO_INCREMENT," +
        "FOREIGN KEY(pres_id) REFERENCES President(id)," +
        "FOREIGN KEY(party_id) REFERENCES Party(party_id))"
        pool.query(createString, function(err){
            console.log("Person_Party created");
    });
  });
  pool.query("DROP TABLE IF EXISTS Profession", function(err){
        var createString = "CREATE TABLE Profession(" +
        "prof_id INT PRIMARY KEY AUTO_INCREMENT," +
        "prof_name VARCHAR(255) NOT NULL)"
        pool.query(createString, function(err){
            console.log("Profession created");
    });
  });
   pool.query("DROP TABLE IF EXISTS Pres_Profession", function(err){
        var createString = "CREATE TABLE Pres_Profession(" +
        "pres_id INT PRIMARY KEY AUTO_INCREMENT," +
        "prof_id INT PRIMARY KEY AUTO_INCREMENT," +
        "FOREIGN KEY(pres_id) REFERENCES President(id),"+
        "FOREIGN KEY(prof_id) REFERENCES Profession(prof_id))"
        pool.query(createString, function(err){
            console.log("Pres_Profession created");
    });
  });
  pool.query("DROP TABLE IF EXISTS Birth_State", function(err){
        var createString = "CREATE TABLE Birth_State(" +
        "state_id INT PRIMARY KEY AUTO_INCREMENT," +
        "state_name VARCHAR(255) NOT NULL," +
        "city_name VARCHAR(255) NOT NULL)"
        pool.query(createString, function(err){
            console.log("Birth_State created");
    });
  });
  pool.query("DROP TABLE IF EXISTS Pres_State", function(err){
        var createString = "CREATE TABLE Pres_State(" +
        "sid INT PRIMARY KEY AUTO_INCREMENT," +
        "pid INT PRIMARY KEY AUTO_INCREMENT," +
        "FOREIGN KEY(sid) REFERENCES Birth_State(state_id),"+
        "FOREIGN KEY(pid) REFERENCES President(id))"
        pool.query(createString, function(err){
            console.log("Pres_State created");
    });
  });
  pool.query("DROP TABLE IF EXISTS Vice_State", function(err){
        var createString = "CREATE TABLE Vice_State(" +
        "sid INT PRIMARY KEY AUTO_INCREMENT," +
        "vid INT PRIMARY KEY AUTO_INCREMENT," +
        "FOREIGN KEY(sid) REFERENCES Birth_State(state_id),"+
        "FOREIGN KEY(vid) REFERENCES Vice_President(vice_id))"
        pool.query(createString, function(err){
            console.log("Vice_State created");
    });
  });
  pool.query("DROP TABLE IF EXISTS Vice_Profession", function(err){
        var createString = "CREATE TABLE Vice_Profession(" +
        "vice_id INT PRIMARY KEY AUTO_INCREMENT," +
        "prof_id INT PRIMARY KEY AUTO_INCREMENT," +
        "FOREIGN KEY(vice_id) REFERENCES President(id),"+
        "FOREIGN KEY(prof_id) REFERENCES Profession(prof_id))"
        pool.query(createString, function(err){
            console.log("Vice_Profession created");
    });
  });
    pool.query("DROP TABLE IF EXISTS PresVice", function(err){
        var createString = "CREATE TABLE PresVice(" +
        "pid INT," +
        "vid INT," +
        "PRIMARY KEY(pid,vid)," +
        "FOREIGN KEY(pid) REFERENCES President(id) on delete cascade," +
        "FOREIGN KEY(vid) REFERENCES Vice_President(vice_id)) on delete cascade"
        pool.query(createString, function(err){
            console.log("PresVice created");
            res.send(null);
    });
  });
});






app.get('/display', function(req, res){
    
   pool.query("SELECT * FROM Presidents", function(err, rows, fields){
       if(err){
            console.log(err);
           return;
       }
    var results = JSON.stringify(rows);
    res.send(results);
    
   });
});

app.post('/insertPresident', function(req, res, next){
    var context = {};
    console.log(req.body);
   pool.query("INSERT INTO President(name, age, year, term) VALUES (?, ?, ?, ?)", [req.body.name, req.body.age, req.body.year, req.body.term], function(err, result){
       if(err){
           next(err);
           return;
       }
    context.id= result.insertId;
    console.log("President Added");
    res.send(context);
   
   });
});

app.post('/insertVicePresident', function(req, res, next){
    var context = {};
    console.log(req.body);
   pool.query("INSERT INTO Vice_President(vice_name, vice_age) VALUES (?, ?)", [req.body.name, req.body.age], function(err, result){
       if(err){
           next(err);
           return;
       }
    context.id= result.insertId;
    console.log("Vice President Added");
    res.send(context);
   
   });
});

app.post('/insertParty', function(req, res, next){
    console.log(req.body);
    var context = {};
   pool.query("INSERT INTO Party(party_name) VALUES (?)", [req.body.name], function(err, result){
       if(err){
           next(err);
           return;
       }
    context.id= result.insertId;
    console.log("Party Added");
    res.send(context);
   
   });
});

app.post('/insertProfession', function(req, res, next){
    var context = {};
    console.log(req.body)
   pool.query("INSERT INTO Profession(prof_name) VALUES (?)", [req.body.name], function(err, result){
       if(err){
           next(err);
           return;
       }
    context.id= result.insertId;
    console.log("Profession Added");
    res.send(context);
   
   });
});

app.post('/insertState', function(req, res, next){
    console.log(req.body);
    var context = {};
   pool.query("INSERT INTO Birth_State(state_name, city_name) VALUES (?, ?)", [req.body.name, req.body.city], function(err, result){
       if(err){
           next(err);
           return;
       }
    context.id= result.insertId;
    console.log("State added");
    res.send(context);
   
   });
});

app.post('/getPresVice', function(req, res, next){

    var context = {};
    pool.query("SELECT id FROM President WHERE name=?", [req.body.name], function(err, rows, fields){
       if(err){
           next(err);
           return;
    }
    context.pres = rows[0];
    pool.query("SELECT vice_id FROM Vice_President WHERE vice_name=?", [req.body.vice_name], function(err, rows, fields){
       if(err){
           next(err);
           return;
    }
    context.vice = rows[0];
    res.send(context);
    });
     
    });
});

app.post('/insertPresVice', function(req, res, next){
    var context = {};
    pool.query("INSERT INTO PresVice(pid, vid) VALUES (?, ?)", [req.body.pres.id, req.body.vice.vice_id], function(err, result){
       if(err){
           next(err);
           return;
       }
    context.id= result.insertId;
    console.log("Pres Vice Connection added");
    res.send(context);
   
   })
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
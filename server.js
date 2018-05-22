var http = require('http');
var mongodb = require('mongodb');
var qs=require('querystring');
var MongoClient = mongodb.MongoClient;

var port = (process.env.PORT ||  8888);
var mongo_host = (process.env.MONGO_SERVICE_HOST || 'localhost' );
var mongo_port = (process.env.MONGO_SERVICE_PORT || 27017 );
var url = 'mongodb://'+mongo_host+':'+mongo_port+'/employee';

function createHomePage(req,res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<html>");
  res.write("<body style='background-color:lightyellow;'> ");
  res.write("<center>");
  res.write("<form name='DisplayForm' method='POST' >");
  res.write("<legend><center><h1>Employee Information </h1></center></legend>");
  res.write("<input type='button' onclick=\"location.href='/AddEmployee'\" value='AddEmployee' />");
  res.write("<input type='button' onclick=\"location.href='/UpdateEmployee'\" value='UpdateEmployee' />");   
  res.write("<input type='button' onclick=\"location.href='/GetEmployee'\" value='GetEmployee' />");
  res.write("<input type='button' onclick=\"location.href='/DeleteEmployee'\" value='DeleteEmployee' />");
    res.write("</form>");
    res.write("</center>");
    res.write("</body>");
  res.write("</html>");
  res.end();
  
}

function addEmployeeForm(req,res,data){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<html>");
  res.write("<body style='background-color:lightyellow;'> ");
  res.write("<center>");
  res.write("<form method='POST' >");
  res.write("<legend><h2><center> Add New Employee </center></h2></legend>");
  res.write("<table>");
    res.write("<tr>");
  res.write("<p><td><label for='value'>First Name                   :</label></td>");
  if ( data && data.fname ){
    res.write("<td><input type='text' id='fname' name='fname' value="+ data.fname +"></td>");
  }
  else{
    res.write("<td><input type='text' id='fname' name='fname' value=''></td>");
  } 
  res.write("</p>");
    res.write("</tr>");
    res.write("<tr>");
  res.write("<p><td><label for='value'>Last Name                    :</label></td>");
  if ( data && data.lname ){
    res.write("<td><input type='text' id='lname' name='lname' value="+ data.lname +"></td>");
  }
  else{
    res.write("<td><input type='text' id='lname' name='lname' value=''></td>");
  } 
  res.write("</p>");
    res.write("</tr>");
    res.write("<tr>");
  res.write("<p><td><label for='value'>ID                           :</label></td>");
  if ( data && data.empid ){
    res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
  }
  else{
    res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
  } 
  res.write("</p>");
  res.write("</tr>");
    res.write("<tr>");
  res.write("<p><td><label for='value'>Department                            :</label></td>");
  if ( data && data.dept ){
    res.write("<td><input type='text' id='dept' name='dept' value="+ data.dept +"></td>");
  }
  else{
    res.write("<td><input type='text' id='dept' name='dept' value=''></td>");
  }
  res.write("</p>");
  res.write("</tr>");
    res.write("<tr>");
  res.write("<p><td><label for='value'>Designation                           :</label></td>");
  if ( data && data.dsgn ){
    res.write("<td><input type='text' id='dsgn' name='dsgn' value="+ data.dsgn +"></td>");
  }
  else{
    res.write("<td><input type='text' id='dsgn' name='dsgn' value=''></td>");
  }
  res.write("</p>");
  res.write("</tr>");
    res.write("<tr>");
  res.write("<p><td><label for='value'>Salary                                :</label></td>");
  if ( data && data.sal ){
    res.write("<td><input type='text' id='sal' name='sal' value="+ data.sal +"></td>");
  }
  else{
    res.write("<td><input type='text' id='sal' name='sal' value=''></td>");
  }
  res.write("</p>");
  res.write("</tr>");
    res.write("<tr>");
  res.write("<td><input type='submit' value='Add'></td>");
  res.write("</tr>");
  res.write("<tr>");
  res.write("<td><input type='button' onclick=\"location.href='/'\" value='Go to Homepage' /></td>");
  res.write("</tr>");   
  
  if (data) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('employee');

        //Add employee
        var employee = {firstname: data.fname,lastname:data.lname , id: data.empid ,dept:data.dept,dsgn: data.dsgn,Salary:data.sal };

        // Insert some users
        collection.insert(employee, function (err, result) {
          if (err) {
            console.log(err);
            res.write("<tr>");
            res.write("<td> Added employee with id  " + data.empid + " into the employee collection failed.</td>");
            res.write("</tr>");
            
          } else {
            
            res.write("<tr>");
            res.write("<td> Added employee with id  " + data.empid + " into the employee collection.</td>");
            res.write("</tr>");
            
          }
          res.write("<table>");
          res.write("</form>");
          res.write("</center>");
          res.write("</body>");
          res.write("</html>");
          res.end();
          //Close connection
          db.close();
        });
      }
    });
  }
  
  }

function getEmployeeForm(req,res,data){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<html>");
  res.write("<body style='background-color:lightyellow;'> ");
  res.write("<center>");
  res.write("<form method='POST' >");
  res.write("<legend><h1><center> Get Employee Information </center></h1></legend>");

  // Key and value
  res.write("<p><label for='key'>Emp Id                   :</label>");
  if ( data && data.empid ){
    res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
  }
  else{
    res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
  } 
  res.write("</p>");
  res.write("<input type='submit' value='Get'>");
  res.write("<input type='button' onclick=\"location.href='/'\" value='Go to Homepage' />");
  res.write("</form>");
  if (data) {
  MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('employee');
        
        // Insert some users
        collection.find({id: data.empid}).toArray(function (err, result) {
          if (err) {
            console.log(err);
          } else if (result.length) {
           
            res.write('Found the employee with id '+ data.empid);
            var rs1=JSON.stringify(result[0]);
            var rs=JSON.parse(rs1);
            res.write("<table border=\"1\">");
        res.write("<tr>");
        res.write("<td> First Name </td>");
        res.write("<td> Last Name </td>");
        res.write("<td> ID </td>");
        res.write("<td> Department </td>");
        res.write("<td> Designation </td>");
        res.write("<td> Salary </td>");
        res.write("</tr>");
        res.write("<tr>");
        res.write("<td>" + rs.firstname + " </td>");
        res.write("<td>" + rs.lastname + " </td>");
        res.write("<td>" + rs.id + " </td>");
        res.write("<td>" + rs.dept + " </td>");
        res.write("<td>" + rs.dsgn + " </td>");
        res.write("<td>" + rs.Salary + " </td>");
        res.write("</tr>");
          } else {
            res.write('No document with id '+ data.empid +'.');
          }
          res.write("</center>");
          res.write("</body>");
          res.write("</html>");
          res.end();
          //Close connection
          db.close();
        });
      }
    });
  }
  
}

function updateEmployeeForm(req,res,data){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<form method='POST'>");
  res.write("<body style='background-color:lightyellow;'> ");
  res.write("<center>");
  res.write("<legend><h1> Update Employee </h1></legend>");
  res.write("<table>");
  res.write("<tr>");
  res.write("<p><td><label for='key'>Emp Id                   :</label></td>");
  if ( data && data.empid ){
    res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
  }
  else{
    res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
  }
  res.write("</p>");
  res.write("</tr>");
  res.write("<tr>");
  res.write("<p><td><label for='key'>Designation                   :</label></td>");
  if ( data && data.dsgn ){
    res.write("<td><input type='text' id='dsgn' name='dsgn' value="+ data.dsgn +"></td>");
  }
  else{
    res.write("<td><input type='text' id='dsgn' name='dsgn' value=''></td>");
  }
  res.write("</p>");
  res.write("</tr>");
  res.write("<tr>");
  res.write("<p><td><label for='key'>Salary                   :</label></td>");
  if ( data && data.sal ){
    res.write("<td><input type='text' id='sal' name='sal' value="+ data.sal +"></td>");
  }
  else{
    res.write("<td><input type='text' id='sal' name='sal' value=''></td>");
  }
  res.write("</p>");
  res.write("</tr>");
  res.write("<td><input type='submit' value='Update'></td>");   
  res.write("<tr>");
  res.write("<td><input type='button' onclick=\"location.href='/'\" value='Go to Homepage' /></td>");
  res.write("</tr>");   
  res.write("</table>");
  res.write("</form>");
  if (data) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        // Get the documents collection
        var collection = db.collection('employee');

        collection.update({id: data.empid}, {$set: {dsgn:data.dsgn,Salary:data.sal}}, function (err, numUpdated) {
            if (err) {
              console.log(err);
            } else if (numUpdated) {
              res.write('Updated employee with id '+ data.empid +'.');
              } else {
                res.write('No document with id '+ data.empid +'.');
              }
            res.write("</center>");
            res.write("</body>");
              res.write("</html>");
              res.end();
            //Close connection
            db.close();
          });
      }
    });
  }   

}

function deleteEmployeeForm(req,res,data){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<form name='ActionForm' method='POST'>");
  res.write("<body style='background-color:lightyellow;'> ");
  res.write("<center>");
  res.write("<legend><h1> Delete Employee Information </h1></legend>");
  // Key and value
  res.write("<p><label for='key'>Emp Id                   :</label>");
  if ( data && data.empid ){
    res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
  }
  else{
    res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
  } 
  res.write("</p>");
  res.write("<input type='submit' value='Delete'>");
  res.write("<input type='button' onclick=\"location.href='/'\" value='Go to Homepage' />");
  res.write("</form>");
  if (data) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
      
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('employee');

        console.log(data.empid);
        // Insert some users
        collection.remove({id: data.empid},function (err,deletedCount) {
          console.log(deletedCount);
          if (err) {
            console.log(err);
          } else if (deletedCount) {
            res.write('Document deleted with id '+ data.empid +'.');
          }else {
          
            res.write('No document with id '+ data.empid +'.');
              }
            res.write("</center>");
            res.write("</body>");
              res.write("</html>");
              res.end();
          //Close connection
            db.close();
          });
      }
    });
  }
    
}

http.createServer(function (req, res) {

  switch(req.method){
  case 'GET':
    if ( req.url === '/' ){
          createHomePage(req,res);
          res.end();
    }else if ( req.url === '/AddEmployee' ){
      addEmployeeForm(req,res);
      res.end();
    }else if ( req.url === '/UpdateEmployee' ){
      updateEmployeeForm(req,res);
      res.end();
    }else if ( req.url === '/GetEmployee' ){
      getEmployeeForm(req,res);
      res.end();
    }else if ( req.url === '/DeleteEmployee' ){
      deleteEmployeeForm(req,res);
      res.end();
    }
    
    break;
  case 'POST':
    if ( req.url === '/AddEmployee'){
      var body = '';
      req.on('data',function(data){
        body += data;
        if ( body.length > 1e7 ){
          res.end();
        }
      });
      req.on('end',function(data){
        var formData=qs.parse(body);
        console.log(formData);
        addEmployeeForm(req,res,formData);
        
      });
      
    }else if ( req.url === '/UpdateEmployee'){
      var body = '';
      req.on('data',function(data){
        body += data;
        if ( body.length > 1e7 ){
          res.end();
        }
      })
      req.on('end',function(data){
        var formData=qs.parse(body)
        updateEmployeeForm(req,res,formData);
      })
    }else if ( req.url === '/GetEmployee'){
      var body = '';
      req.on('data',function(data){
        body += data;
        if ( body.length > 1e7 ){
          res.end();
        }
      })
      req.on('end',function(data){
        var formData=qs.parse(body)
        getEmployeeForm(req,res,formData);
      })
    }else if ( req.url === '/DeleteEmployee'){
      var body = '';
      req.on('data',function(data){
        body += data;
        if ( body.length > 1e7 ){
          res.end();
        }
      })
      req.on('end',function(data){
        var formData=qs.parse(body)
        deleteEmployeeForm(req,res,formData);
      })
    }
    break;
  default:
    break;
      
  }
  
}).listen(port);

console.log('Server running at http://127.0.0.1:'+port);
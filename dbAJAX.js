
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){    
    


document.getElementById("submitPres").addEventListener('click', function(){
    var req = new XMLHttpRequest;
    
    var payload = {'name': null, 'age': null, 'year':null, 'term':null};
    payload.name = document.getElementById('presName').value;
    payload.age = document.getElementById('presAge').value;
    payload.year = document.getElementById('presYear').value;
    payload.term = document.getElementById('presTerm').value;
    
    req.open('POST', 'http://52.89.7.205:2000/insertPresident', true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                document.getElementById("presP").textContent = "Success";
                
          } else {
                console.log("Error");
                document.getElementById("presP").textContent = "Error";
          }
      });
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 
    
});


document.getElementById("submitvicePres").addEventListener('click', function(){
    var req = new XMLHttpRequest;
    
    var payload = {'name': null, 'age': null};
    payload.name = document.getElementById('vicepresName').value;
    payload.age = document.getElementById('vicepresAge').value;
   
    
    req.open('POST', 'http://52.89.7.205:2000/insertVicePresident', true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                document.getElementById("vicepresP").textContent = "Success";
                
          } else {
                console.log("Error");
                document.getElementById("vicepresP").textContent = "Error";
          }
      });
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 
    
});

document.getElementById("submitParty").addEventListener('click', function(){
    var req = new XMLHttpRequest;
    
    var payload = {'name': null};
    payload.name = document.getElementById('partySelect').value;

    req.open('POST', 'http://52.89.7.205:2000/insertParty', true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                document.getElementById("partyP").textContent = "Success";
                
          } else {
                console.log("Error");
                document.getElementById("partyP").textContent = "Error";
          }
      });
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 
    
});

document.getElementById("submitProf").addEventListener('click', function(){
    var req = new XMLHttpRequest;
    
    var payload = {'name': null};
    payload.name = document.getElementById('profName').value;

    req.open('POST', 'http://52.89.7.205:2000/insertProfession', true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                document.getElementById("profP").textContent = "Success";
                
          } else {
                console.log("Error");
                document.getElementById("profP").textContent = "Error";
          }
      });
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 
    
});




};








document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){

document.getElementById("submitPres_Vice").addEventListener('click', function(){
    var req = new XMLHttpRequest;
    
    var payload = {'name': null, 'vice_name': null};
    payload.name = document.getElementById('pName').value;
    payload.vice_name = document.getElementById('vName').value;

    req.open('POST', 'http://52.89.7.205:2000/getPresVice', true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                if(presVice(response)){
                    document.getElementById("presviceP").textContent = "Success";
                    
                }

                }
                    
             else {
                console.log("Error");
                document.getElementById("presviceP").textContent = "Error";
          }
      });
        
        req.send(JSON.stringify(payload));
        event.preventDefault();
        
});


function presVice(response){
    
    var Newreq = new XMLHttpRequest;
 
                
    Newreq.open('POST', 'http://52.89.7.205:2000/insertPresVice', true);
    Newreq.setRequestHeader('Content-Type', 'application/json');
    Newreq.addEventListener('load', function(event){
        if(Newreq.status >= 200 && Newreq.status < 400){
            var response = JSON.parse(Newreq.responseText);         
            return response;
                
            } else {
                console.log("Error");
            return null;
            }       
    });
    Newreq.send(JSON.stringify(response));
    event.preventDefault();
}
    
    
    
    
};



    
    
    
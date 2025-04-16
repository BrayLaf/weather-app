
$(function(){

  fetch('/api/viewReg')
  .then(response => response.json())
  .then(data =>{
    $(".fillerText").html("");
    var text;
    data.forEach(element => {
        console.log(element);
        text = `
                Registration ID: ${element.registrationID} <br> 
                BVCID: ${element.bvcID}<br> 
                Name: ${element.name}<br> 
                Address: ${element.address}<br> 
                Status: ${element.status}<br> 
                Amount owed: $${element.payment}<br><br>`;
        $(".fillerText").append(text);        
    });
    
  })
.catch(error => console.error('Error viewing registrations', error));
});
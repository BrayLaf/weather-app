$(function(){

    // footer timestamp logic
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();
    $(".timestamp").html("Current Date and Time: " + timestamp);

    // ham bar logic
    const hamMenu = document.querySelector(".ham");
    const mobileMenu = document.querySelector(".mobilemenu");
    $(".ham").click(function(){
        hamMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // form validation 
    $('#registrationForm').submit( async function (event) {

        function registerUser(regID, BVCID, Name, Address, Status, Payment) {
            this.registrationID = regID;
            this.bvcID = BVCID;
            this.name = Name;
            this.address = Address;
            this.status = Status;
            this.payment = Payment;
        }
        let valid = true;
    
        // Clear previous error messages
        $('#bvcIDError, #fnameError, #addressError, #statusError').text("");
    
        let bvcID = $.trim($('#idInput').val());
        if (!/^\d+$/.test(bvcID)) {
            valid = false;
            $('#bvcIDError').text("Please enter a valid BVC ID. It should contain only numeric characters.");
        }
        let fullName = $.trim($('#FnameInput').val());
        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            valid = false;
            $('#fnameError').text("Please enter your full name using letters and spaces only.");
        }
        let address = $.trim($('#addressInput').val());
        if (address === "") {
            valid = false;
            $('#addressError').text("Address cannot be blank.");
        }
        let status = $('#status').val();
        if (status === "") {
            valid = false;
            $('#statusError').text("Please select a valid status.");
        }
        if (!valid) {
            event.preventDefault();
            return; // Stop further execution if not valid.
        } else {
            // Prevent the default form submission and proceed 
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
            console.log("Form data:", data);
            
            // Calculate the payment based on status
            let payment = 0;
            if (data.status === 'student')
                payment = 10;
            else if (data.status === 'staff')
                payment = 50;
            else if (data.status === 'volunteer')
                payment = 0;
            
            let r = Math.floor(Math.random() * 100) + 1;
            let newUser = new registerUser(r, data.bvcID, data.Fname, data.address, data.status, payment);
            
            // Provide immediate feedback to the user
            $(".register").html(`
              <p class="fillerText">Thank you for registering, here is your receipt:</p>
              <p class="fillerText receipt">
                Registration ID: ${r} <br> 
                BVCID: ${data.bvcID}<br> 
                Name: ${data.Fname}<br> 
                Address: ${data.address}<br> 
                Status: ${data.status}<br> 
                Amount owed (paid in person): $${payment}
              </p>
            `);
            await fetch('/api/register',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .catch(error => console.error('Error registering:', error));
        }
    });
    
    
});
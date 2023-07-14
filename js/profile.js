const xhr = new httpRequest();

xhr.get("json/happyUsers.json", 
function(error, user){
    
    if(error){
        console.log(error)
    }
    else{

        user = JSON.parse(user);
        
        const username = document.getElementById("username").innerText = `${user.username}`; 

        let ddd = new Date(`${user.registrationDate}`);
        let registrationDate = getBeautifulDate(ddd);
        const doc = document.getElementById("doc").innerHTML           = `<span class="pull-left"><strong>Joined</strong></span> ${registrationDate}`;
        
        const fullname = document.getElementById("fullname").innerHTML = `<span class="pull-left"><strong>Full name</strong></span> ${user.firstName} ${user.lastName}`;

        const email = document.getElementById("email").innerHTML       = `<span class="pull-left"><strong>Email</strong></span> ${user.email}`;

        if(user.dateOfBirth !=null){
        	const age = document.getElementById("age").innerHTML       = `<span class="pull-left"><strong>Age</strong></span> ${getAge(user.dateOfBirth)}`;
        }
        else{
        	document.getElementById("age").innerHTML                   = `<span class="pull-left"><strong>Age</strong></span> -`;
        }
    
        document.getElementById("new_picture").setAttribute("action", `saveUserPhoto/${user.userId}`);

        const img = document.querySelector("#img-profile");
        //img.setAttribute("src", `getUserPhoto/${user.userId}`);
        // img.setAttribute("src", localStorage.getItem("imageLink"));
        // localStorage.setItem("imageLink", "andreas.jpg");
    }
});



let d = new Date();


let lastLogin = getBeautifulDate(d);


const lastLog = document.getElementById("lastLogin").innerHTML = '<span class="pull-left"><strong>Last seen</strong></span> '+ lastLogin;

document.getElementById("imageProfile").addEventListener("click", function(){
	
	const imageForm = document.getElementById("new_picture");
	
	imageForm.style.display = "block";
	
});

document.getElementById("deleteProfile").addEventListener("click", function(){
    
    console.log("delete my profile");

    location.reload();
});




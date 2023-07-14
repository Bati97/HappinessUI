const liSettings       = document.querySelector("#settings"),
      aSettings        = liSettings.firstChild,
      divSettingsInfo  = document.querySelector("#settingsInfo");

aSettings.addEventListener("click", function(){

    changeTab(liSettings, liHome, liTasks, divSettingsInfo, divHomeInfo, divTasksInfo);

    document.getElementById("myActivitiesTabs").style.display = "none";

});

const imgSettings = document.getElementById("imgSettings");
//imgSettings.setAttribute("src", localStorage.getItem("imageLink"));

const http = new httpRequest();

function getInitializedFields(){

	http.get("json/happyUsers.json", function(error, user){

	    if(error){
	        console.log(error);
	    }
	    else{
	        user = JSON.parse(user);
	        
	        document.getElementById("first_name").value       = user.firstName;
	        document.getElementById("last_name").value        = user.lastName;
	        document.getElementById("usernameSettings").value = user.username;
	        document.getElementById("emailSettings").value    = user.email;
	        document.getElementById("password").value         = user.password;
	        document.getElementById("docSettings").value      = user.registrationDate;     
	        document.getElementById("idSettings").value       = user.userId;
	        
	        document.getElementById("password2").value        = user.password;
	        
	    }
	});
	
	document.getElementById("diffPassw").innerHTML = "";
}

getInitializedFields();



//Get values from form and convert them to json objects
const formToJSON = elements => [].reduce.call(elements, (data, element) => {

	  data[element.name] = element.value;
	  return data;

	}, {});

const handleFormSubmit = event => {

	document.getElementById("settingsButtons").style.display = "none";

	document.getElementById('loading').style.display = 'block';

	setTimeout(editProfile, 2000);

	event.preventDefault();
	
	};

const form = document.getElementById("registrationForm");
form.addEventListener('submit', handleFormSubmit);

function editProfile(){
	const data = formToJSON(form.elements);
	if(data.password === data.password2){
		  
		  http.put("http://localhost:8080/happy/user", data, 
				   function(error,user){
				
				     if(error){
			    	 		console.log(error);
				         }
				         else{
				        	 user = JSON.parse(user);
				        	 
				        	 location.reload();
				         }
				
			 });
			 
	}
	else{
		  document.getElementById("diffPassw").innerHTML = "Different verified password. Please correct it.";
	  }

	document.getElementById("settingsButtons").style.display = "block";

	document.getElementById('loading').style.display = 'none';
}



























/*document.getElementById("button3").addEventListener("click", function(){

	  const xhr = new XMLHttpRequest();

	  xhr.open("GET", "http://localhost:8080/happy/users", true);

	  let output = ``;  
	  
	  xhr.onload = function(){
	    if(this.status === 200){

	      const users = JSON.parse(this.responseText);
	      
	      users.forEach(function(user){
	    	  
	    	  let roles = Array.from(user.roles);
	    	  
	    	  let rolesName = "";
	    	  
	    	  roles.forEach(function(role){
	    		 rolesName += role.name + " ,"; 
	    		 
	    	  });
	    	 var roleNamesWithoutCommaInTheEnd = rolesName.substring(0, rolesName.length - 1);
	    	  output += `
	              <ul>
	                  <li>ID: ${user.userId}</li>
	                  <li>USERNAME: ${user.username}</li>
	                  <li>PASSWORD: ${user.password}</li>
	                  <li>EMAIL: ${user.email}</li>
	                  <li>ROLE: ${roleNamesWithoutCommaInTheEnd}</li>
	              </ul>`;

	              document.getElementById("users").innerHTML = output;
	      });

	    }

	  };

	  xhr.send();

	});*/



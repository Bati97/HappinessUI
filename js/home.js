const liHome       = document.querySelector("#home"),
aHome        = liHome .firstChild,
divHomeInfo  = document.querySelector("#homeInfo"),
general      = document.querySelector("#general"),
january      = document.querySelector("#January"),
february     = document.querySelector("#February"),
march        = document.querySelector("#March"),  
april        = document.querySelector("#April"),  
may          = document.querySelector("#May"),
june         = document.querySelector("#June"),
july         = document.querySelector("#July"),
august       = document.querySelector("#August"),
september    = document.querySelector("#September"),
october      = document.querySelector("#October"),
november     = document.querySelector("#November"),
december     = document.querySelector("#December");


aHome.addEventListener("click", function(){

changeTab(liHome, liTasks, liSettings, divHomeInfo, divTasksInfo, divSettingsInfo);

document.getElementById("myActivitiesTabs").style.display = "block";
});

const httpHome = new httpRequest();

httpHome.get("json/happyUsers.json", function(error, user){

if(error){
  console.log(error);
}
else{

user = JSON.parse(user);

function init(...tabs){

tabs.forEach(function(tabActivated){
  if(tabActivated != null){
      tabActivated.addEventListener("click",function(){
          
          tab = getActiveTab();
          
          changeMonthsTab(tabActivated,tab);
      
      });
  }
});
}

init(general, january, february, march, april, may, june, july, august, september, october, november, december);


var tab;

function getActiveTab(){

var tabListItems = document.getElementById('myActivitiesTabs').childNodes;

tabListItems.forEach(function(tabListItem){
  
  if(tabListItem.nodeName == "LI" && tabListItem.className == "active"){
     
     tab = tabListItem; 
            
  }
});

return tab;
}


function changeMonthsTab(activeElement, inactiveElement) {

  if(activeElement != null){
                
        activeElement.setAttribute("class","active");

        if(inactiveElement != undefined){
          inactiveElement.removeAttribute("class");
        }
        
        fillhomeTable(activeElement);
  }  
}

function fillhomeTable(activeElement){
const homeTable = document.getElementById("items");

      httpHome.get("json/currentYearProfile.json", (error, currentYearProfiles) => {

        if(error){
          console.log(error);
        }
        else{

          currentYearProfiles = JSON.parse(currentYearProfiles);

          var content = "";

          for(let i = 0; i < currentYearProfiles.length; i++){
            if(activeElement.id === "general"){
              
              document.getElementById("addActivity").innerHTML = "#";

                  content =      `<tr>
                                          <td>${1}</td>
                                          <td>${activeElement.id}</td>
                                          <td>${activeElement.id}</td>
                                          <td>${activeElement.id}</td>
                                          <td>${activeElement.id}</td>
                                  </tr>`;
            }
            else{
                           
              if(currentYearProfiles[i].month === `${activeElement.id.toUpperCase()}`){
                
                const addActivity = document.getElementById("addActivity");

                addActivity.innerHTML = `<a href = "#" id = "addAct/Rel/${currentYearProfiles[i].month}" class = "addAct"><i class="fa fa-plus-square" style="font-size:24px; color:black"></i></a>`;
                
                let date = new Date(currentYearProfiles[i].activity.added);

                content +=  `<tr>
                              <td><a href="#" id="${currentYearProfiles[i].profileId} " class = "removeActivity" ><i class="fa fa-remove" style = 'color: orange '></i></a></td>
                              <td>${currentYearProfiles[i].activity.activityName}</td>
                              <td>${currentYearProfiles[i].happiness.description}</td>
                              <td>${currentYearProfiles[i].rating}%</td>
                              <td>${getBeautifulDate(date)}</td>
                           </tr>`;
              }
            }
          }
    
          homeTable.innerHTML = content;
      
        }
      })


}

document.body.addEventListener("click",deleteActivity);

function deleteActivity(e){
  if(e.target.parentElement.classList.contains("removeActivity")){
    if(confirm("Are you sure ?")){
        const activityId = e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[0].id;
        console.log(activityId);
        console.log(e.target.parentElement.parentElement.parentElement);
        const activity = e.target.parentElement.parentElement.parentElement;
        activity.remove();
    }
  }
}

document.body.addEventListener("click",addActivity);
		
function addActivity(e){
    if(e.target.parentElement.classList.contains("addAct")){
         
        const activity = e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[0];
              
        const month = activity.id.split("addAct/Rel/")[1];
        console.log(month);
        const modal = document.getElementById("addActivityModal");

        modal.style.display = "block";

        document.getElementById("closeActivityModal").addEventListener("click", () => {modal.style.display = "none"});
          
        window.addEventListener("click", (e) => {
          if(e.target == modal){
            modal.style.display = "none";
          }
        });
    }
  }


httpHome.get(`json/previousYearProfile.json`, 
  function(error,previousYearProfiles){
      if(error){
          console.log(error);
      }
        else{
            previousYearProfiles = JSON.parse(previousYearProfiles);
            
            let today = new Date();

            let avgRatingPreviousYear = Math.round(71.25 * 100) / 100;
            
            document.getElementById("avgPrev").innerHTML = `<a href = "#" style = "color:grey" id = "analysisPreviousYear"><span class="pull-left"><strong id="prevYear">
                                                          General ${today.getFullYear()-1}</strong></span> 
                                                          ${avgRatingPreviousYear}% </a>`;

            const modal = document.getElementById("tablePrevYearModal");
                                                          
            document.getElementById("analysisPreviousYear").addEventListener("click", () =>{
                
              modal.style.display = "block";
                
            });
              
            document.getElementById("closePrevModal").addEventListener("click", () => {modal.style.display = "none"});
                
            window.addEventListener("click", (e) => {
              if(e.target == modal){
                modal.style.display = "none";
              }
            });

            let content = ``;

            let date;

            for (let i = 0; i < previousYearProfiles.length; i++){
              
              date = new Date(previousYearProfiles[i].activity.added);

              date = getBeautifulDate(date);
              content +=      `<tr>
                                      <td>${i + 1}</td>
                                      <td>${previousYearProfiles[i].activity.activityName}</td>
                                      <td>${previousYearProfiles[i].happiness.description}</td>
                                      <td>${previousYearProfiles[i].rating}%</td>
                                      <td>${date}</td>
                              </tr>`;
            }
 
            document.getElementById("prevProfiles").innerHTML = content;
      }
});


}
});




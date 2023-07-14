
const liTasks       = document.querySelector("#tasks"),
      aTasks        = liTasks.firstChild,
      divTasksInfo  = document.querySelector("#tasksInfo");

 aTasks.addEventListener("click", function(){
     
    changeTab(liTasks, liHome, liSettings, divTasksInfo, divHomeInfo, divSettingsInfo);

    document.getElementById("myActivitiesTabs").style.display = "none";
 });
    
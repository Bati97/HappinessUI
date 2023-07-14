const taskForm = document.querySelector("#task-form");

const taskInput = document.getElementById("task");
taskInput.value = "";

let ul = document.querySelector("ul.collection");

const clearBtn = document.querySelector(".clear-tasks");

const filter = document.querySelector("#filter");

taskForm.addEventListener("submit", onSubmit);

//keydown, keyup, keypress, focus, blur,cut, paste, input
taskInput.addEventListener("keydown",function(e){
   // console.log(e.target.value);
});

function onSubmit(e){
    e.preventDefault();
    console.log(`${e.type}`);

    createListItem(taskInput.value);
};

function createListItem(nameOfItem){

    if(nameOfItem.trim() !== "" && nameOfItem.length <= 46){
        
        let li = document.createElement("li");

        li.setAttribute("class","collection-item");
        li.textContent = nameOfItem;

        let link = document.createElement("a");
        link.setAttribute("href","#");
        link.setAttribute("class","delete-item secondary-content");
        
        li.appendChild(link);
        
        let img = document.createElement("i");
        img.setAttribute("class","fa fa-remove");
        link.appendChild(img);

        ul.appendChild(li);

        localStorage.setItem(nameOfItem,nameOfItem);

        taskInput.value = "";
    }
    else{
        document.getElementById("validInput").innerText = "Number of characters must be : 1 - 46";
    }
};

clearBtn.addEventListener("click", function(e){
    e.preventDefault();
    
    let lis = ul.querySelectorAll("li");
    if(lis.length != 0){
        if(confirm("Are you sure ? All tasks are going to be removed...")){
            lis.forEach(function(){
                document.querySelector("li.collection-item").remove();
            });
            localStorage.clear();
        }
    }
});


//delegation-- gia diaxwrismo twn items na ta kanw delete
document.body.addEventListener("click",deleteItem);

function deleteItem(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure ?")){
            e.target.parentElement.parentElement.remove();
            localStorage.removeItem(e.target.parentElement.parentElement.textContent);
        }
    }
    
}

filter.addEventListener("keyup",function(e){

    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        }
        else{
            task.style.display = "none";
        }
    });
});
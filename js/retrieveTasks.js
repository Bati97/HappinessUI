function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

var myItems = allStorage();


myItems.forEach(function(item){

    let ul = document.querySelector("ul.collection");

    let li = document.createElement("li");

    li.setAttribute("class","collection-item");
    li.textContent = item;

    let link = document.createElement("a");
    link.setAttribute("href","#");
    link.setAttribute("class","delete-item secondary-content");
    
    li.appendChild(link);
    
    let img = document.createElement("i");
    img.setAttribute("class","fa fa-remove");
    link.appendChild(img);

    ul.appendChild(li);
});
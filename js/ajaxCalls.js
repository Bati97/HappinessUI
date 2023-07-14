function httpRequest(){
    this.http =  new XMLHttpRequest();
}

httpRequest.prototype.get = function(url, callback){

    this.http.open("GET", url, true);

    let self = this;

    this.http.onload = function(){

        if(self.http.status === 200){
            callback(null, this.responseText);
        }
        else{
            callback("Error: " + self.http.status);
        }
    }

    this.http.send();
}

httpRequest.prototype.post = function(url, data, callback){

    this.http.open("POST", url, true);

    this.http.setRequestHeader("Content-type", "application/json");

    this.http.onload = function(){

        callback(null, this.responseText);
    }

    this.http.send(JSON.stringify(data));
}

httpRequest.prototype.put = function(url, data, callback){

    this.http.open("PUT", url, true);

    this.http.setRequestHeader("Content-type", "application/json");

    
    this.http.onload = function(){
        
        callback(null, this.responseText);
    }

    this.http.send(JSON.stringify(data));
}

httpRequest.prototype.delete = function(url, callback){

    this.http.open("DELETE", url, true);
    let self = this;
    this.http.onload = function(){

        if(self.http.status === 200){
            callback(null,"USER DELETED");
        }
        else{
            callback(`Error: ` + self.http.status);
        }
    }

    this.http.send();
}
 
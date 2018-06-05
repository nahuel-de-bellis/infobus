function ajax(){
    let aj = new XMLHttpRequest();
    aj.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    let data = {"lat": 123, "long": 1234};
    let json = JSON.stringify(data);
    let rand = Math.random();
    console.log(rand);
    aj.open("GET", "/getBus?t="+rand, true);
    aj.send();
}
var mapa;
var colectivo = [];
window.addEventListener('load', ()=>{
    mapa = initMap(0, 0);
});
function initMap(Lat = 0, Long = 0) {
    let position = {lat: Lat, lng: Long};
    let map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 4,
    	center: position
    });

    return map;

}

function removeMarks(){
    for(let i = 0; i < colectivo.length; i++){
        console.log(colectivo[i]);
        colectivo[i].setMap(null);
    }

}

function addMarker(map, Lat, Long) {
    let position = {lat: Lat, lng: Long};
    let image = "mark1.png";
    let contentString = `<div id="content">
        <div id="siteNotice">
        </div>
        <h2 id="firstHeading" class="firstHeading">Linea 1</h2>
        <div id= "bodyContent">
        <p>Primera Junta - Moron
        </div>
        </div>`;


    let marker = new google.maps.Marker({
       position: position,
       icon: image,
       map: map,
       title: "Linea 1",
     });

    colectivo.push(marker);

    let infowindow = new google.maps.InfoWindow({
       content: contentString
     });
     
    google.maps.event.addListener(marker, 'click', function(){
       infowindow.open(map, marker);
    });
}



function ajax(){
    setInterval(function (){
    removeMarks();
    let aj = new XMLHttpRequest();
    aj.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let res = this.responseText;
            let coor = JSON.parse(res);
            coor.map((value, index)=>{
                console.log(value["Lat"], value["Long"]);
                addMarker(mapa, value["Lat"], value["Long"]);
            });
                
            }
        };
        let data = {"Linea": document.getElementById("text1").value, "lat": 123, "long": 1234};//posicion usuario
        aj.open("GET", "/getBus?Linea="+data["Linea"], true);
        aj.send();
    }, 1000);    
}


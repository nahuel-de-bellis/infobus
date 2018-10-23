var mapa;
var colectivo = [];
var infoWindow, ds, dr;
var image= "mark1.png";
var LocationMark = "x.png";
var paradas = [
        {lat:-34.633921, lng: -58.542994},
        {lat:-34.634602, lng: -58.544078},
        {lat:-34.634805, lng: -58.545078},
        {lat:-34.634444, lng: -58.548252},
        {lat:-34.634665, lng: -58.550462},
        {lat:-34.635458, lng: -58.554407},
        {lat:-34.636201, lng: -58.556909},
        {lat:-34.636667, lng: -58.558455},
        {lat:-34.637130, lng: -58.559996},
        {lat:-34.637567, lng: -58.561427},
        {lat:-34.638083, lng: -58.563097},
        {lat:-34.638879, lng: -58.565390},
        {lat:-34.639653, lng: -58.563880},
        {lat:-34.637979, lng: -58.565475},
        {lat:-34.638201, lng: -58.567647},
        {lat:-34.638237, lng: -58.570727}
      ];

function trazarRuta (position, paradaair) {
    let selection = document.getElementById("selection").value;
    //console.log("Trazando.....", selection)
    var objConfigDS ={
        origin:position,
        destination:paradas[paradaair],
        travelMode:google.maps.TravelMode[selection]
    }
    ds.route(objConfigDS,fnrutear);
}

function fnrutear(resultados,status){
    if (status=='OK'){
        dr.setDirections(resultados);
    }
    else alert('error'+status);
}

window.addEventListener('load', ()=>{
    mapa = initMap(-34.6385032, -58.564768);
});

function initMap(Lat = 0, Long = 0) {
    let position = {lat: Lat, lng: Long};
    let map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 15,
    	center: position
    });

    let objConfigDR ={
        map: map
    };

    ds = new google.maps.DirectionsService();
    dr = new google.maps.DirectionsRenderer(objConfigDR);

    // GEOLOCALIZACION
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            map.setCenter(pos);
            var marker = new google.maps.Marker({
                position: pos,
                icon: LocationMark,
                map: map,
                title: "Tu ubicacion",
            });
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } 
    else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    return map;

}

function showTrayecto(map){
    var flightPlanCoordinates = [
        {lat: -34.634843, lng: -58.544027},
        {lat: -34.634486, lng: -58.548235},
        {lat: -34.634980, lng: -58.552424},
        {lat: -34.638150, lng: -58.563172},
        {lat: -34.637804, lng: -58.563995},
        {lat: -34.638049, lng: -58.565604},
        {lat: -34.640226, lng: -58.565031},
        {lat: -34.640129, lng: -58.563907},
        {lat: -34.637877, lng: -58.564358},
        {lat: -34.638199, lng: -58.566352},
        {lat: -34.638270, lng: -58.569085},
        {lat: -34.638343, lng: -58.574011},
    ];

        // Información de la ruta (coordenadas, color de línea, etc...)
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#0061ff',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);

}

function showParadas(map){
    for (i = 0; i < paradas.length; i++) {
        var act = new Object();
        act.marcador = new google.maps.Marker({
            position: paradas[i],
            icon: LocationMark,
            map: map,
            title: "Parada " + i + " linea 1",
            parent: act,
        });

        act.paradainfo = new google.maps.InfoWindow({
            content: '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h2 id="firstHeading" class="firstHeading">Linea 1, parada '+i+'</h2>'+
            '<div id= "bodyContent">'+
            '<p>Primera Junta - Moron</br>'+
            '<button onclick= "trazarRuta(pos,'+i+')" >Como llegar</button>'+
            '<select id="selection">'+
            '<option value="WALKING">caminando</option>'+
            '<option value="DRIVING">manejando</option></select>'+
            '</div>'+
            '</div>',
            position: act.marcador.position
        });


        act.clickListener = function(){
            this.parent.paradainfo.open(map, this.parent.marcador);
        }

        google.maps.event.addListener(act.marcador,'click',act.clickListener);
    }

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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


function ajax(){
    showParadas(mapa);
    showTrayecto(mapa);
    setInterval(function (){
    removeMarks();
    let aj = new XMLHttpRequest();
    aj.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let res = this.responseText;
            let coor = JSON.parse(res);
            coor.map((value, index)=>{
                addMarker(mapa, value["Lat"], value["Long"]);
            });
                
            }
        };
        let data = {"Linea": document.getElementById("text1").value, "lat": 123, "long": 1234};//posicion usuario
        aj.open("GET", "/getBus?Linea="+data["Linea"], true);
        aj.send();
    }, 1000);    
}


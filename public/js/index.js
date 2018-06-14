var coor = {"Lat": 0, "Lon": 0};
      
function initMap() {
    let position = {lat: coor["Lat"], lng: coor["Lon"]};
    let map = new google.maps.Map(document.getElementById('map'), {
	zoom: 4,
	center: position
    });

    let contentString = `<div id="content">
        <div id="siteNotice">
        </div>
        <h2 id="firstHeading" class="firstHeading">Linea 1</h2>
        <div id= "bodyContent">
        <p>Primera Junta - Moron
        </div>
        </div>`;

     let infowindow= new google.maps.InfoWindow({
	content: contentString
     });


     let image= "mark1.png";
     let marker = new google.maps.Marker({
	position: position,
	icon: image,
        map: map,
        title: "Linea 1",
     });

    google.maps.event.addListener(marker,'click',function(){
	infowindow.open(map,marker);
    });

}


function ajax(){
	    let aj = new XMLHttpRequest();
		aj.onreadystatechange = function(){
		    if(this.readyState == 4 && this.status == 200){
		       let res = this.responseText;
			   coor = JSON.parse(res);
			   console.log(coor["Lat"], coor["Lon"]);
			   initMap();
		    }
		};
		let data = {"id": document.getElementById("text1").value, "lat": 123, "long": 1234};//posicion usuario
		aj.open("GET", "/getBus?Id="+data["id"], true);
		aj.send();
}


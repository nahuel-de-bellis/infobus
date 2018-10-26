/*
    This sketch sends data via HTTP GET requests to data.sparkfun.com service.

    You need to get streamId and privateKey at data.sparkfun.com and paste them
    below. Or just customize this script to talk to other HTTP servers.

*/

#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>


SoftwareSerial arduino(0, 2);// RX | TX

const char* ssid     = "Nahuel";
const char* password = "43093343N";

const char* host = "192.168.1.103";
int id = 123;
long lat;
long lon;
String aux = "", aux2 = "", content = "";
void setup() {
  Serial.begin(115200);
  arduino.begin(115200);
  pinMode(0, INPUT);
  pinMode(2, OUTPUT);
  
 
  //lon = arduino.read();
  delay(10);

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
     would try to act as both a client and an access-point and could cause
     network-issues with your other WiFi-devices on your WiFi-network. */
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address:  ");
  Serial.println(WiFi.localIP());
}

int value = 0;

void loop() {
   char cha = ' ';
   int comas = 0;
   content = " ";
   delay(1000);
   while(arduino.available() && comas < 2){
    cha = arduino.read();
    if(cha == ':'){
      comas++;
    }
    content += cha;
   }
  if(comas == 2){
    int pos = content.indexOf(':');
    aux = content.substring(0, pos);
    aux2 = content.substring(pos+1, content.length()-1);
  }
  if(lat != aux.toInt() || lon != aux2.toInt()){
    lat = aux.toInt();
    lon = aux2.toInt();
  }
  
  Serial.print("Lat: ");
  Serial.print(lat);
  Serial.print(" Lon: ");
  Serial.print(lon);
  
  Serial.println();
  Serial.println();
  arduino.flush();
  ++value;

  Serial.print("connecting to ");
  Serial.println(host);

  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 3000;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // We now create a URI for the request
  String url = "/setBus";
  url += "?idCol=";
  url += id;
  url += "&Lat=";
  url += lat;
  url += "&Long=";
  url += lon;
  Serial.print("Requesting URL: ");
  Serial.println(url);

  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

  // Read all the lines of the reply from server and print them to Serial
  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  Serial.println();
  Serial.println("closing connection");
}


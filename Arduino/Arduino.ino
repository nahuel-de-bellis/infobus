#include <SoftwareSerial.h>

SoftwareSerial ArduinoUno(3,4);
/*
 *      Primera cuadra
 * 79, 51 -34.638057, -58.565597 
 * 71, 51 -34.638384, -58.565496    
 * 56, 51 -34.638710, -58.565382     
 * 46, 51 -34.639081, -58.565255      
 *     Segunda cuadra
 * 36, 51 -34.639176, -58.565237
 * 27, 51 -34.639353, -58.565205
 * 21, 51 -34.639701, -58.565137
 * 10, 51 -34.639895, -58.565097
 * 4, 51 -34.640162, -58.565046
 * 
 * 
*/

typedef struct checks{
  int maqueta1;
  int maqueta2;
  long long coordenadas1;
  long long coordenadas2;
}checks;

unsigned int tiempoS1;
String f;
long latitud = 1, longitud = 1;
unsigned int tiempoS2;

checks puntos[]={
  {79, 51, -34638057, -58565597},
  {71, 51, -34638384, -58565496},
  {56, 51, -34638710, -58565382},  
  {46, 51, -34639081, -58565255},    
  {36, 51, -34639176, -58565237},
  {27, 51, -34639353, -58565205},
  {21, 51, -34639701, -58565137},
  {10, 51, -34639895, -58565097},
  {4, 51, -34640162, -58565046}
};
 
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  ArduinoUno.begin(115200); 
    
  pinMode(11, INPUT);//ECHO S1
  pinMode(10, OUTPUT); //TRIGER S1
  
  pinMode(9, INPUT); //ECHO S2
  pinMode(8, OUTPUT); // TRIGER S2
  
}

void loop() {
  
  // put your main code here, to run repeatedly:
  digitalWrite(10, LOW);
  digitalWrite(8, LOW);
  delayMicroseconds(2);
  
  digitalWrite(10, HIGH);
  delayMicroseconds(1);
  digitalWrite(10, LOW);
  tiempoS1 = pulseIn(11, HIGH);  
  tiempoS1 = tiempoS1 / 59;
  
  digitalWrite(8, HIGH);
  delayMicroseconds(1);
  digitalWrite(8, LOW);
  tiempoS2 = pulseIn(9, HIGH);
  tiempoS2 = tiempoS2 / 59;
  
  Serial.print("Distancia S1 ");
  Serial.print(tiempoS1);
  Serial.print(" Cm");
  Serial.println(" ");
  Serial.print("Distancia S2 ");
  Serial.print(tiempoS2);
  Serial.print(" Cm");
  Serial.println(" ");

  
  
  for(int i = 0; i < 9; i++){
    if(checkPoint(tiempoS1, puntos[i].maqueta1) && checkPoint(tiempoS2, puntos[i].maqueta2)){
      latitud = puntos[i].coordenadas1;
      longitud = puntos[i].coordenadas2;
      f = String(latitud)+String(':')+String(longitud)+String(':');
      
      ArduinoUno.print(f);
      Serial.print("latitud ");  
      Serial.println(latitud);  
      Serial.print("longitud ");  
      Serial.println(longitud);
    }
  }
  

  /*if(tiempoS1 > 1 && tiempoS2 > 1){
    Serial.print("latitud ");  
    Serial.println(latitud);  
    Serial.print("longitud ");  
    Serial.println(longitud);
    f = String(latitud)+String(':')+String(longitud)+String(':');
    ArduinoUno.print(f);  
  }*/
  
}

boolean checkPoint(unsigned int tiempo, int point){
  if(tiempo == point || tiempo == point+1 || tiempo == point-1){
    return true;
  }
  else{
    return false;
  }
}


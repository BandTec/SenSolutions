#include <dht.h>
#define dht_dpin A2 //Pino DATA do Sensor ligado na porta Analogica A1
dht DHT; //Inicializa o sensor
void setup()
{
  Serial.begin(9600);
  delay(1000);//Aguarda 1 seg antes de acessar as informações do sensor
}
void loop()
{
  DHT.read11(dht_dpin); //Lê as informações do sensor
  //Serial.print(DHT.humidity,0);
 // Serial.print(" , ");
  Serial.println(DHT.temperature,0 ); 
  delay(2000);  
}

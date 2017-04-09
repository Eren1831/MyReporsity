#include "Wire.h"
#include "I2Cdev.h"
#include "MPU6050.h"
MPU6050 accelgyro;
int16_t ax, ay, az;
int16_t gx, gy, gz;
bool blinkState = false;
unsigned long timer;
int zeroValue[5] = {950, -400, 13500, -100, -500};
int gyroXangle = 180;
int gyroYangle = 180;
int compAngleX = 180;
int compAngleY = 180;
int kd=0,kp=0;
int sensorValue_x = 0;
int sensorMin_x = 160;
int sensorMax_x = -160;
int sensorValue_y = 0;
int sensorMin_x_y = 160;
int sensorMax_x_y = -160;
int accXval = 0;
int accYval = 0;
void setup() {
  Wire.begin();
  Serial.begin(115200);
  Serial.println("Initializing I2C devices...");
  accelgyro.initialize();
  Serial.println("Testing device connections...");
  Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");
  timer = micros();
  //Calibration Sens.gyro
  while (millis() < 3000) {
    sensorValue_x = accXval;
    sensorValue_y = accYval;
    if (sensorValue_x > sensorMax_x) {
      sensorMax_x = sensorValue_x;
    }
    if (sensorValue_x < sensorMin_x) {
      sensorMin_x = sensorValue_x;
    }
    if (sensorValue_y > sensorMax_x_y)
    {
      sensorMax_x_y = sensorValue_y;
    }
    if (sensorValue_y < sensorMin_x_y)
    {
      sensorMin_x_y = sensorValue_y;
    }
  }
}

void loop() {
  gyro();
  sensorValue_x = accXval;
  sensorValue_x = map(sensorValue_x, sensorMin_x, sensorMax_x, -160, 160);

}
void gyro()
{
  accelgyro.getRotation(&gx, &gy, &gz);
  int gyroXrate = -((gx - zeroValue[3]) / 131);
  gyroXangle += gyroXrate * ((int)(micros() - timer) / 1000000);
  int gyroYrate = ((gy - zeroValue[4]) / 131);
  gyroYangle += gyroYrate * ((int)(micros() - timer) / 1000000);
  accelgyro.getAcceleration(&ax, &ay, &az);
  int accXval = ax - zeroValue[0];
  int accZval = ay - zeroValue[2];
  int accXangle = (atan2(accXval, accZval) + PI) * RAD_TO_DEG;
  int accYval = ay - zeroValue[1];
  accZval = ay - zeroValue[2];
  int accYangle = (atan2(accYval, accZval) + PI) * RAD_TO_DEG;
  compAngleX = (0.93 * (compAngleX + (gyroXrate * (int)(micros() - timer) / 1000000))) + (0.07 * accXangle);
  compAngleY = (0.93 * (compAngleY + (gyroYrate * (int)(micros() - timer) / 1000000))) + (0.07 * accYangle);
  timer = micros();
  Serial.print(accXval / 100); Serial.print("\t");
  Serial.print(accYval / 100); Serial.print("\t");
  Serial.print("\n");

}
int pid(int hedef_dgr, int dgr) {
  float pidTerm;
  int hata;
  static int son_hata;
  static int toplam_hata;
  hata = hedef_dgr - dgr;
  toplam_hata += hata;
  pidTerm = (hata) * kp + (hata - son_hata) * kd;
  son_hata = hata;
  return (int(pidTerm));


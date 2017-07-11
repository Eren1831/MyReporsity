int motor1_pwm = 0;
int motor2_pwm = 0;
int  result_temp;
static int motor1, motor2;
double kd = 1, kp = 1;
int result, hiz;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(A2, INPUT);
}

void loop() {

  result = pid(512, analogRead(A0));
  result = map(result, -512, 512, -255, 255);

  motor1 += analogRead(A1);
  motor2 += analogRead(A1);

  motor1 -= result;
  motor2 += result;

  if (motor1 < 0)motor1 = 0;
  if (motor2 < 0)motor2 = 0;
  if (motor1 > 255)motor1 = 255;
  if (motor2 > 255)motor2 = 255;

  Serial.print(result);Serial.print("  \t ");
  Serial.print(result_temp); Serial.print("  \t ");
  Serial.print(hiz); Serial.print("  \t ");
  //Serial.print(analogRead(A2)); Serial.print("  \t ");
  Serial.print(motor1); Serial.print(" \t  ");
  Serial.print(motor2); Serial.print("  \n ");

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
}

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
  digitalWrite(12, HIGH);
  int val = analogRead(A0);
  result = pid(511, val);

  result = map(result, -307, 307, -255, 255);
  result = map(result, -425, 425, -255, 255);


  hiz = analogRead(A2);
  hiz=map(hiz,0,1023,0,255);
  motor1_pwm=hiz;
  motor2_pwm=hiz;

  /*if(result<0)
    {
    hiz=map(hiz,0,1023,-255,0);
    }*/
/*  if (result >= 0)
  {
    hiz = map(hiz, 0, 1023, 0, 255);
    if (hiz > result)
    {
       result_temp=result;
    }
    if (hiz < result)
    {
      result_temp = hiz;
    }
  }*/
  motor1 = motor1_pwm - result;
  motor2 = motor2_pwm + result;


  if (motor1 < 0)motor1 = 0;
  if (motor2 < 0)motor2 = 0;

  if (motor2 > motor2_pwm)motor2 = motor2_pwm;
  if (motor1 > motor1_pwm)motor1 = motor1_pwm;

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

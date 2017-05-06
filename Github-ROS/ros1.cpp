 /******************************************
	PURPOSE:	Step Motor Elevator
	Created by      Diego Serrano Reinel after some sketches by Rudy Schlaf
	DATE:		11/2014
*******************************************/

//----- Switches & Photocells -----//

#define switchFloor1 0 // Switches are connected to these pins
#define switchFloor2 2
#define switchFloor3 3

#define photocellFloor2 0 // Photocells and 10K pulldown resistor are connected to A0 and A1 for an analog reading
#define photocellFloor3 1

//----- Stepper motor -----//

#define steps 520 // Number of steps needed to reach the next floor (displace the elevator 7cm)

#define stepperPin1  10 // These are the Arduino pins that we use to activate coils 1-4 of the stepper motor
#define stepperPin2  11
#define stepperPin3  12
#define stepperPin4  13

#define delaytime 10   // Delay time in ms to control the stepper motor delaytime
                      // 8 is about the fastest that can yield reliable operation w/o missing steps

//----- 7 segment LED display -----//

#define A 4 // (A = 11) Corresponding arduino pins for the segments on the 7 segment LED display
#define B 5 // (B = 7)
#define C 6 // (C = 4)
#define D 7 // (D = 2)
#define E 8 // (E = 1)
#define f 10 // Not used in the circuit
#define G 9 //(G = 5)
#define DP 11 // Not used in the circuit

#define CC4 1 // (CC4 = 13) Pin driving common cathodes

//definition of segments; digital point is off
//    -------  
//   |   A   |  
//  F|       |B 
//   |---G---|  
//  E|       |C 
//   |   D   |   
//    -------                 

//------------------------------------ Done with #define statements

// Variables

boolean firstRun = true;
int currentFloor = 1; // Used to save the current floor. This value is changed with the switches and with the readings done by the photocells
long debounceTime = 200; // The switch's debounce time
int secondFloorReading = 0; // The analog reading from the sensor divider (for floor 2 and 3)
int thirdFloorReading = 0;

// Number array
// An array is defined and filled with the 'numbersegments' array in the #define section
// Rows and columns are assigned as follows: numbers[number][segments]
// Each group of 8 in {....} defines the state of the a,b,c,d,e,f,g,dp segments for the numbers from 1 to 3
byte numbers[3][8] = {{0,1,1,0,0,0,0,0},{1,1,0,1,1,0,1,0},{1,1,1,1,0,0,1,0}}; 

const int segments[8] = { A, B, C, D, E, f, G, DP }; // This defines an array that contains the arduino pins for each segment

void setup(){
  Serial.begin(9600); // Initialize serial port
  
  pinMode(A, OUTPUT); // Set anodes low to make sure all segments are off
  digitalWrite(A,LOW);
  pinMode(B, OUTPUT);
  digitalWrite(B,LOW);
  pinMode(C, OUTPUT);
  digitalWrite(C,LOW);
  pinMode(D, OUTPUT);
  digitalWrite(D,LOW);
  pinMode(E, OUTPUT);
  digitalWrite(E,LOW);
  pinMode(f, OUTPUT); // This pin will not be connected to the board
  digitalWrite(f,LOW);
  pinMode(G, OUTPUT);
  digitalWrite(G,LOW);
  pinMode(DP, OUTPUT); // This pin will not be connected to the board
  digitalWrite(DP,LOW);
  
  pinMode(CC4, OUTPUT); // Set catodes high to turn off digit
  digitalWrite(CC4,HIGH);  
  
  pinMode(switchFloor1, INPUT); // Define the arduino pins for the swi tches as inputs
  pinMode(switchFloor2, INPUT);
  pinMode(switchFloor3, INPUT);
  
  pinMode(stepperPin1, OUTPUT); // Define the the arduino pins for the stepper's coils as outputs
  pinMode(stepperPin2, OUTPUT); 
  pinMode(stepperPin3, OUTPUT); 
  pinMode(stepperPin4, OUTPUT);
}

void loop(){    
   
  secondFloorReading = analogRead(photocellFloor2); // Get a reading from the photocells to verify the current floor
  thirdFloorReading = analogRead(photocellFloor3);
  
  Serial.print("Analog reading (Second floor) = ");
  Serial.println(secondFloorReading); // the raw analog reading
  Serial.print("Analog reading (Third floor) = ");
  Serial.println(thirdFloorReading); // the raw analog reading
  delay(1000);
    
  if(secondFloorReading > 790 && thirdFloorReading > 790) // Check if the elevator is in the first floor
  {
    setSegments(0, CC4); // Turn on the segments that display the number 1
    currentFloor = 1; // Set the current floor to 1
                      // The elevator is meant to start at the first floor
  } 
  else if(secondFloorReading < 750) // Check if the elevator is in the second floor
  {
    setSegments(1, CC4); // Turn on the segments that display the number 2
    currentFloor = 2;
  }
  else if(thirdFloorReading < 750) // Check if the elevator is in the third floor
  {
    setSegments(2, CC4); // Turn on the segments that display the number 3
    currentFloor = 3;
  }

  // The following if statement will only allow the switch's input if the current floor is not already 1
  // The coils in the stepper motor will go backwards if the elevator
  // is on either floor 2 or floor 3
  // If it is on floor 3, it will go backwards twice the number of steps
  if(readSwitch(switchFloor1, debounceTime) == true && currentFloor != 1){
    
    if(currentFloor == 2){
      Serial.println("going down");
      int numberOfSteps = steps+90;
      step_OFF(); // Turning all coils off
      
      while(numberOfSteps>0){ 
        backward(); // Going backward
        numberOfSteps -- ; // Counting down the number of steps   
      }
    }
    else if(currentFloor == 3){
      
       Serial.println("going down");
       int numberOfSteps = (steps*2)+80;
       step_OFF(); // Turning all coils off
       
       while(numberOfSteps>0){
         backward(); // Going backward
         numberOfSteps -- ; // Counting down the number of steps
       }
    }
    currentFloor = 1; // Sets the currentFloor to 1 since the elevator is now at the first floor
    delay(1000);
  }
  
  // The following if statement will only allow the switch's input if the current floor is not already 2
  // The coils in the stepper motor will go forward or backwards if the elevator
  // is on either floor 1 or floor 3, respectively
  if(readSwitch(switchFloor2, debounceTime) == true && currentFloor != 2){
    
    if(currentFloor == 1){
      Serial.println("going up");
      int numberOfSteps = steps+90;
      step_OFF(); // Turning all coils off
      
      while(numberOfSteps>0){
        forward(); // Going forward
        numberOfSteps -- ; // Counting down the number of steps
      }
    }
    else if(currentFloor == 3){
      Serial.println("going down");
      int numberOfSteps = steps+5;
      step_OFF(); // Turning all coils off
      
      while(numberOfSteps>0){
        backward(); // Going forward
        numberOfSteps -- ; // Counting down the number of steps
      }
    }
    currentFloor = 2; // Sets the currentFloor to 2 since the elevator is now at the second floor
    delay(2000);
  }
  
  // The following if statement will only allow the switch's input if the current floor is not already 3
  // The coils in the stepper motor will go backwards if the elevator
  // is on either floor 1 or floor 2 
  // If it is on floor 1, it will go forward twice the number of steps
  if(readSwitch(switchFloor3, debounceTime) == true && currentFloor != 3){ //
    if(currentFloor == 1){
      Serial.println("going up");
      int numberOfSteps = (steps*2)+80; // Twice the number of steps to reach floor 3
      step_OFF(); // Turning all coils off
        
      while(numberOfSteps>0){
        forward(); // Going forward
        numberOfSteps -- ; // Counting down the number of steps
      }
    }
    else if(currentFloor == 2){
      Serial.println("going up");
      int numberOfSteps = steps+5;
      step_OFF(); // Turning all coils off
        
      while(numberOfSteps>0){
        forward(); // Going forward
        numberOfSteps -- ; // Counting down the number of steps
      }
    }
    currentFloor = 3; // Sets the currentFloor to 2 since the elevator is now at the second floor
    delay(2000);
  }
  Serial.println(currentFloor);
  }
//
unsigned long zaman=0,zaman2=0;
int value=0;
int value1=0;
int button,button_state,button1,button2;
int katdurumu;
void setup() {
  // put your setup code here, to run once:
pinMode(A0,INPUT);
pinMode(A1,INPUT);
pinMode(6,OUTPUT);
pinMode(5,OUTPUT);
pinMode(4,OUTPUT);
pinMode(8,INPUT);
digitalWrite(6,LOW);
Serial.begin(9600);
pinMode(2,INPUT);
}

void loop() {

 value=analogRead(A2);
 value1=analogRead(A1);
 button=digitalRead(2);
 button1=digitalRead(8);
 button2=digitalRead(9);
 if(value1<=700 && value>=800)
 katdurumu=3;
 if(value1>=700 && value<=800)
 katdurumu=2;
 Serial.print(button);
 Serial.print("|");
 Serial.print(value1);
 Serial.print("|");
 Serial.println(value);
 if(button==0 && katdurumu==2)
 {
   up();
   Serial.println("yukarı çikiyor");
 }
 if(button1==0 && katdurumu==3)
 {
  down();
 }
 
}















 
void up()
{
  digitalWrite(6,LOW);
  digitalWrite(4,HIGH);
  if(millis() - zaman >1)
  {
    digitalWrite(5,HIGH);
    zaman=millis();
  }
  if(millis() - zaman2 > 1)
  {
    digitalWrite(5,LOW);
    zaman2=millis();
  }
}
void down()
{
  digitalWrite(6,LOW);
  digitalWrite(4,LOW);
  if(millis() - zaman >1)
  {
    digitalWrite(5,HIGH);
    zaman=millis();
  }
  if(millis() - zaman2 > 1)
  {
    digitalWrite(5,LOW);
    zaman2=millis();
  }
 
}
void stopped()
{
  
}

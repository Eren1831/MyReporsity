#include <ros.h>
#include <std_msgs/String.h>
#include <std_msgs/Empty.h>
#include <std_msgs/UInt16.h>

ros::NodeHandle  nh;


void messageCb( const std_msgs::UInt16& toggle_msg){
  analogWrite(11,toggle_msg.data);
}

ros::Subscriber<std_msgs::UInt16> sub("chatter", messageCb );
//std_msgs::String str_msg;
//ros::Publisher chatter("chatter", &str_msg);

char hello[13] = "hello world!";

void setup()
{
  pinMode(11, OUTPUT);
  nh.initNode();
//  nh.advertise(chatter);
   nh.subscribe(sub);
}

void loop()
{
//  str_msg.data = hello;
  //chatter.publish( &str_msg );
  nh.spinOnce();
  delay(1);
}

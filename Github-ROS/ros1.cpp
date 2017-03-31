#include "ros/ros.h"
#include <std_msgs/UInt16.h>
#include <sstream>
using namespace std;
int main(int argc, char **argv)
{

  ros::init(argc, argv, "talker");


  ros::NodeHandle n;


  ros::Publisher ext_pub = n.advertise<std_msgs::UInt16>("chatter", 1000);

  ros::Rate loop_rate(10);

  int count = 0;
  while (ros::ok())
  {
 
    std_msgs::UInt16 msg;
    count++;
    msg.data=count;
    if(count==255)
    	count--;


    //ROS_INFO("%d", msg.data);

  
    ext_pub.publish(msg);
    ros::spinOnce();
    loop_rate.sleep();
  }


  return 0;
}
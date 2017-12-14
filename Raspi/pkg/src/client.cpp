
#include "ros/ros.h"
#include "pkg/AddTwoInts.h"
#include "pkg/Num.h"
#include <std_msgs/String.h>
#include <sstream>
#include <string>
#include <cstdlib>

#include "std_msgs/MultiArrayLayout.h"
#include "std_msgs/MultiArrayDimension.h"

#include "std_msgs/Int32MultiArray.h"

using namespace std;
std::vector<int>dizi;
pkg::Num msg;

void chatterCallback(const std_msgs::String::ConstPtr& value)
{
 // ROS_INFO("GelenVeri: [%s]", value->data.c_str());
  msg.value1 =value->data.substr(1,3);
  msg.value2 = value->data.substr(4,6).c_str();
  msg.value3 = value->data.substr(7,9).c_str();
  msg.value4 = value->data.substr(10,12).c_str();
  msg.value5 = value->data.substr(13,15).c_str();
  ROS_INFO("GelenVeri1: [%s]", msg.value1);
}


/*void chatterCallback(const std_msgs::Int32MultiArray::ConstPtr& value)
{
 // ROS_INFO("GelenVeri: [%s]", value->data.c_str());
  dizi.push_back(10);

  ROS_INFO("GelenVeri1: [%d]", dizi[0]);
}*/

int main(int argc, char **argv)
{
  ros::init(argc, argv, "add_two_ints_client");
  ros::init(argc, argv, "listener");
  
  ros::NodeHandle n;

  ros::ServiceClient client = n.serviceClient<pkg::AddTwoInts>("add_two_ints");
  ros::Subscriber talk = n.subscribe("chatter", 1000, chatterCallback);

  pkg::AddTwoInts srv;

  /*std_msgs::Int32MultiArray array;
  array.data.clear();

  int value=5;
  array.data.push_back(value);*/

  srv.request.a = 5;
  srv.request.b = 10;

  ros::Rate loop_rate(100);
 
  if (client.call(srv))
  {
    ROS_INFO("Sum: %ld", (long int)srv.response.sonuc);
  }
  
  
  else
  {
    ROS_ERROR("Failed to call service add_two_ints");
    return 1;
  }

    while (ros::ok())
  {

    ros::spinOnce();
    loop_rate.sleep();
  }

  return 0;
}

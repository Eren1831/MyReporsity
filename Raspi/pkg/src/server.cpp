#include "ros/ros.h"
#include "pkg/AddTwoInts.h"

bool add(pkg::AddTwoInts::Request  &istek,
         pkg::AddTwoInts::Response &cevap)
{
  cevap.sonuc = istek.a + istek.b;
  ROS_INFO("request: x=%ld, y=%ld", (long int)istek.a, (long int)istek.b);
  ROS_INFO("sending back response: [%ld]", (long int)cevap.sonuc);
  return true;
}

int main(int argc, char **argv)
{
  ros::init(argc, argv, "add_two_ints_server");
  ros::NodeHandle n;

  ros::ServiceServer service = n.advertiseService("add_two_ints", add);
  ROS_INFO("Ready to add two ints.");
  ros::spin();

  return 0;
}

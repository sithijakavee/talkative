import React from "react";
import Navbar from "../components/Navbar";
import ChatComponent from "../components/ChatComponent";
import axios from "axios";

const Chat = () => {
  const email = localStorage.getItem("user");

  const convertDate = (date) => {
    var created_date = new Date(date);

    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = created_date.getFullYear();
    var month = months[created_date.getMonth()];
    var date = created_date.getDate();
    var time = year + "-" + month + "-" + date;

    return time;
  };

  if (!email) {
    window.location.href = "/sign-in";
    return null;
  }
  //CHANGE URL
  // axios
  //   .get(`http://localhost:5000/api/subscriptions?email=${email}`)
  //   .then((res) => {
  //     if (res.data) {
  //       const subscription = res.data;
  //       const today = convertDate(new Date());
  //       const expire = convertDate(subscription.expire);

  //       console.log(convertDate(Date.now()));

  //       if (today > expire) {
  //         console.log("Expired");
  //         window.location.href = "/pricing";
  //         return null;
  //       }
  //     }
  //     else{
  //       console.log("No subscription found");
  //       window.location.href = "/pricing";
  //       return null;
  //     }

  //   });

  axios
    .get(`https://talkative-server.vercel.app/api/subscriptions?email=${email}`)
    .then((res) => {
      if (res.data) {
        const subscription = res.data;
        const today = convertDate(new Date());
        const expire = convertDate(subscription.expire);

        console.log(convertDate(Date.now()));

        if (today > expire) {
          console.log("Expired");
          window.location.href = "/pricing";
          return null;
        }
      } else {
        console.log("No subscription found");
        window.location.href = "/pricing";
        return null;
      }
    });

  return (
    <>
      <ChatComponent />
    </>
  );
};

export default Chat;

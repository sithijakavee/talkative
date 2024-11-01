import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PricingComponents = () => {
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
    var hour = created_date.getHours();
    var min = created_date.getMinutes();
    var sec = created_date.getSeconds();
    var time = year + "-" + month + "-" + date;

    return time;
  };

  if (!email) {
    window.location.href = "/sign-in";
    return null;
  }

   // CHANGE THE URL

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
  //         toast("Your Subscription has been expired!");
  //       } else if (today < expire) {
  //         console.log("Not Expired")
  //         window.location.href = "/chat"
  //       }
  //     }
  //   });

    
  axios
    .get(`https://talkative-server.vercel.app/api/subscriptions?email=${email}`)
    .then((res) => {
      if (res.data.expire) {
        const subscription = res.data;
        const today = convertDate(new Date());
        const expire = convertDate(subscription.expire);

        console.log("Today", convertDate(today));
        console.log("expire", convertDate(expire));

        if (today < expire) {
          console.log("Expired");
          toast("Your Subscription has been expired!");
        } else if (today > expire) {
          console.log("Not Expired")
          window.location.href = "/chat"
          
        }
      }
    });

  return (
    <div className="">
      <div className="w-full h-screen flex items-center justify-center landingImg">
        <div className="p-10 bg-secondary/70 rounded-md flex flex-col items-center gap-5">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-dark">
              Subscribe to Talkative
            </h1>
            <span className="text-sm font-thin text-dark/60">
              Learn English With AI
            </span>
          </div>

          <div>
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold text-primary mb-1">Monthly</h1>

              <a
                href="https://talkative-server.vercel.app/api/subscribe?plan=monthly"
                className="px-4 py-2 bg-secondary text-dark font-semibold rounded-md min-w-[200px] text-center"
              >
                5$/month
              </a>
            </div>
            <br />
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold text-primary mb-1">Yearly</h1>

              <a
                href="https://talkative-server.vercel.app/api/subscribe?plan=yearly"
                className="px-4 py-2 bg-secondary text-dark font-semibold rounded-md min-w-[200px] text-center"
              >
                50$/year
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponents;

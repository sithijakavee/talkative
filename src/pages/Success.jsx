import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  let newDate;
  function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  const plan = searchParams.get("plan");
  const userEmail = localStorage.getItem("user");

  if (!plan || !userEmail) {
    return <div>Access Denied</div>;
  }

  if (plan) {
    if (plan === "monthly") {
      const todayDate = new Date();

      const days = 30;

      newDate = addDays(todayDate, days);
      console.log(newDate);

      // const res = axios.post(`http://localhost:5000/api/subscription`, {
      //   userEmail,
      //   plan: "monthly",
      //   expire: newDate,
      // });

      const res = axios.post(
        `https://talkative-server.vercel.app/api/subscription`,
        {
          userEmail,
          plan: "monthly",
          expire: newDate,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if(res){
        console.log("Subscription successful!");
        localStorage.setItem("expire", newDate.toDateString());
      }
    } else if (plan === "yearly") {
      const todayDate = new Date();

      const days = 365;

      const newDate = addDays(todayDate, days);
      console.log(newDate);

      // const res = axios.post("http://localhost:5000/api/subscription", {
      //   userEmail,
      //   plan: "yearly",
      //   expire: newDate,
      // });

      const res = axios.post(
        "https://talkative-server.vercel.app/api/subscription",
        {
          userEmail,
          plan: "yearly",
          expire: newDate,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-secondary">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-dark ">
          Subscription successful!
        </h2>
        <p>Your subscription plan is {plan}.</p>
        <p>Subscription will expire on {newDate.toDateString()}.</p>
        <br />
        <a
          href={"/chat"}
          className="px-5 py-3 text-secondary font-bold rounded-md text-xl bg-primary"
        >
          Start Learning
        </a>
       
      </div>
    </div>
  );
};

export default Success;

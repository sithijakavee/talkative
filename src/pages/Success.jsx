import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();

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

      const newDate = addDays(todayDate, days);
      console.log(newDate);

      const res = axios.post(`http://localhost:5000/api/subscription`, {
        userEmail,
        plan: "monthly",
        expire: newDate,
      });
    } else if (plan === "yearly") {
      const todayDate = new Date();

      const days = 365;

      const newDate = addDays(todayDate, days);
      console.log(newDate);

      const res = axios.post("http://localhost:5000/api/subscription", {
        userEmail,
        plan: "yearly",
        expire: newDate,
      });
    }
  }

  return <div>Success</div>;
};

export default Success;

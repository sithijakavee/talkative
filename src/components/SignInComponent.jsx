import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import googleLogo from "../assets/images/google.png";

const SignInComponent = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/";
      return null;
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      saveToDB(profile);
    }
  }, [profile]);

   // CHANGE THE URL
  const saveToDB = async (profile) => {
    // const res = await axios.post("http://localhost:5000/api/auth/register", {
    //   name: profile.name,
    //   email: profile.email,
    //   image: profile.picture ? profile.picture : "",
    // });

    const res = await axios.post("https://talkative-server.vercel.app/api/auth/register", {
      name: profile.name,
      email: profile.email,
      image: profile.picture ? profile.picture : "",
    });

    if (res.status === 201) {
      toast("Successfully registered!");
      localStorage.setItem("user", profile.email);
      localStorage.setItem("username", profile.name);
      localStorage.setItem("pp", profile.picture);
      window.location.href = "/";
      console.log(res.data);
    } else if (res.status === 200) {
      localStorage.setItem("user", profile.email);
      localStorage.setItem("username", profile.name);
      localStorage.setItem("pp", profile.picture);
      toast("Welcome back!");
      window.location.href = "/";
      console.log(res.data);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center landingImg">
      <div className="p-10 bg-secondary/70 rounded-md flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-dark">Welcome to Talkative</h1>
            <span className="text-sm font-thin text-dark/60">Learn English With AI</span>
        </div>
        <div className="bg-primary rounded-md flex items-center">
          <img src={googleLogo} alt="" width={30} height={30} className="mx-2"/>
          <button onClick={() => login()} className="bg-white rounded-none text-dark font-light">Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;

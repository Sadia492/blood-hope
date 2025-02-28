import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animation/login.json";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { signInUser, setUser } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const data = { email, password };
    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful");
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        toast.error(error.code);
      });
    form.reset();
  };
  const fillCredentials = (role) => {
    const creds = {
      donor: { email: "hero@hero.com", password: "Hero12" },
      volunteer: { email: "sara@sara.com", password: "Sara12" },
      admin: { email: "mira@mira.com", password: "Mira12" },
    };
    setCredentials(creds[role]);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center h-screen w-11/12 mx-auto">
      <Helmet>
        <title>BloodHope | Login</title>
      </Helmet>
      <div className="card flex-1 w-full p-4  shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-75% to-secondary text-transparent bg-clip-text text-center">
            LOGIN HERE
          </h2>
          <div className="flex space-x-2 justify-center">
            <button
              type="button"
              className="btn bg-gradient-to-r from-primary to-secondary text-white"
              onClick={() => fillCredentials("donor")}
            >
              Donor Credentials
            </button>
            <button
              type="button"
              className="btn bg-gradient-to-r from-primary to-secondary text-white"
              onClick={() => fillCredentials("volunteer")}
            >
              Volunteer Credentials
            </button>
            <button
              type="button"
              className="btn bg-gradient-to-r from-primary to-secondary text-white"
              onClick={() => fillCredentials("admin")}
            >
              Admin Credentials
            </button>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={credentials.email ? credentials.email : ""}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="input input-bordered input-error "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">
                Password
              </span>
            </label>
            <label className="input input-bordered input-error  flex  justify-between items-center gap-2">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="password"
                value={credentials.password ? credentials.password : ""}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className=""
                required
              />

              <button onClick={() => setShow(!show)} type="button" className="">
                {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </label>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account? Please{" "}
            <Link className="text-red-500 font-bold" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Lottie
          className="lg:w-4/5 "
          animationData={loginAnimation}
          loop={true}
        />
      </div>
    </div>
  );
}

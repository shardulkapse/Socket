import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../redux/slices/UserSlice";

function Login({ setActiveForm }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://socket-node.onrender.com/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      if (result.status === 200) {
        dispatch(
          userSliceActions.logUserIn({
            _id: result.data._id,
            email: result.data.email,
            name: result.data.name,
          })
        );
        toast.success("Login successful");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <form
      className="flex flex-col items-center space-y-5 text-white w-full px-10 lg:px-0 lg:w-1/4"
      onSubmit={submitHandler}
    >
      <h1 className="text-4xl tracking-wider font-bold text-blue-500">LOGIN</h1>
      <input
        ref={emailRef}
        type="text"
        placeholder="email"
        className="outline-none w-full border border-white bg-transparent px-5 py-2 hover:bg-slate-800 hover:border-blue-500 focus:bg-slate-800 focus:border-blue-500 duration-500 ease-in-out"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="password"
        className="outline-none w-full border border-white bg-transparent px-5 py-2 hover:bg-slate-800 hover:border-blue-500 focus:bg-slate-800 focus:border-blue-500 duration-500 ease-in-out"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-blue-900/30 hover:bg-blue-900 duration-500 ease-in-out w-32 rounded-xs"
      >
        login
      </button>
      <p className="text-center pt-10">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:text-blue-400 duration-500 ease-in-out"
          onClick={() => setActiveForm(2)}
        >
          Sign In
        </span>
      </p>
    </form>
  );
}

export default Login;

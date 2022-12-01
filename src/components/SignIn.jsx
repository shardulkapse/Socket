import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../redux/slices/UserSlice";

function SignIn({ setActiveForm }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [locked, setLocked] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocked(true);
    try {
      const result = await axios.post(
        "https://socket-node.onrender.com/signin",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          name: nameRef.current.value,
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
        toast.success("Sign in successful");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setLocked(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center space-y-5 text-white w-full px-10 lg:px-0 lg:w-1/4"
      onSubmit={submitHandler}
    >
      <h1 className="text-4xl tracking-wider font-bold text-blue-500">
        SIGN IN
      </h1>

      <input
        ref={nameRef}
        type="text"
        placeholder="name"
        className="outline-none w-full border border-white bg-transparent px-5 py-2 hover:bg-slate-800 hover:border-blue-500 focus:bg-slate-800 focus:border-blue-500 duration-500 ease-in-out"
      />
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
        disabled={locked}
        className="px-5 py-2 bg-blue-900/30 hover:bg-blue-900 duration-500 ease-in-out w-32 rounded-xs"
      >
        sign in
      </button>
      <p className="text-center pt-10">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:text-blue-400 duration-500 ease-in-out"
          onClick={() => setActiveForm(1)}
        >
          Log In
        </span>
      </p>
    </form>
  );
}

export default SignIn;

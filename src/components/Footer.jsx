import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import { userSliceActions } from "../redux/slices/UserSlice";
import axios from "axios";

function Footer({ socket }) {
  const userId = useSelector((state) => state.userDetails.userId);
  const dispatch = useDispatch();
  const msgRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!msgRef.current.value) return;
    try {
      const name = window.localStorage.getItem("s_name");
      const result = await axios.post("http://localhost:8000/addMsg", {
        text: msgRef.current.value,
        senderId: userId,
        senderName: name,
      });
      if (result.status === 200) {
        socket.current.emit("sendMessage", {
          senderId: userId,
          text: msgRef.current.value,
          name: window.localStorage.getItem("s_name"),
          msgId: result.data.insertedId,
        });
        msgRef.current.value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full border-t border-slate-700 py-3 px-2 absolute bottom-0 bg-slate-900">
      <form
        className="lg:px-5 py-1 flex w-full space-x-3 lg:space-x-5"
        onSubmit={submitHandler}
      >
        <input
          ref={msgRef}
          type="text"
          placeholder="enter message"
          className="flex-1 px-5 py-1 rounded-full bg-transparent border border-blue-500 text-white outline-none"
        />
        <button type="submit" className="outline-none lg:mr-5">
          <MdSend className="text-blue-500 w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => dispatch(userSliceActions.logUserOut())}
          className="flex outline-none justify-center items-center"
        >
          <AiOutlineLogout className="text-red-500 w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default Footer;

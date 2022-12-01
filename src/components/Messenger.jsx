import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import TimeAgo from "react-timeago";

function Messenger() {
  const userId = useSelector((state) => state.userDetails.userId);
  const socket = useRef();
  const divRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState();
  const [messages, setMessages] = useState();
  const [newMsg, setNewMsg] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.current = io("https://socket-node.onrender.com");
    socket.current.on("getMessage", (data) => {
      setNewMsg(data);
    });
  }, []);

  useEffect(() => {
    newMsg && setMessages([...messages, newMsg]);
  }, [newMsg]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => setOnlineUsers(users));
  }, [userId]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(`https://socket-node.onrender.com/getMsg`);
      if (result.status === 200) {
        setMessages(result.data);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      divRef.current.scrollIntoView();
    }
  }, [loading, messages]);

  return (
    <>
      {!loading && (
        <div className="w-full h-screen relative">
          <div className="px-5 pt-5 h-screen overflow-y-scroll pb-20 hidesc">
            {messages &&
              onlineUsers &&
              messages.map((el) => {
                return (
                  <div
                    key={el._id}
                    className={`flex w-fit my-3 ${
                      el.senderId === userId && "ml-auto"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-[0.65rem] flex items-center px-[2px] pb-[2px] relative ${
                          el.senderId === userId
                            ? "text-blue-400 text-right justify-end"
                            : "text-stone-400 text-left"
                        }`}
                      >
                        {onlineUsers.find((o) => o.uid === el.senderId) &&
                          el.senderId !== userId && (
                            <div className="w-1 h-1 mr-2 rounded-full bg-green-500" />
                          )}
                        {el.senderName}{" "}
                        {onlineUsers.find((o) => o.uid === el.senderId) &&
                          el.senderId === userId && (
                            <div className="w-1 h-1 ml-2 rounded-full bg-green-500" />
                          )}
                      </p>
                      <div className="flex items-end">
                        <div
                          className={`px-3 py-2 rounded-lg w-fit text-white ${
                            el.senderId === userId
                              ? "bg-blue-400 ml-auto order-2"
                              : "bg-stone-700"
                          }`}
                        >
                          <p>{el.text}</p>
                        </div>
                        <p
                          className={`text-[0.65rem] italic px-2 text-gray-300 ${
                            el.senderId === userId && "text-right"
                          }`}
                        >
                          <TimeAgo date={new Date(el.time)} />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div ref={divRef} />
          </div>
          <Footer socket={socket} />
        </div>
      )}
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-3xl text-white">Loading....</h1>
        </div>
      )}
    </>
  );
}

export default Messenger;

import React, { useState } from "react";
import Login from "./Login";
import SignIn from "./SignIn";

function AuthForm() {
  const [activeForm, setActiveForm] = useState(1);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {activeForm === 1 && <Login setActiveForm={setActiveForm} />}
      {activeForm === 2 && <SignIn setActiveForm={setActiveForm} />}
    </div>
  );
}

export default AuthForm;

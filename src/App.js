import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "./components/AuthForm";
import Messenger from "./components/Messenger";
import { userSliceActions } from "./redux/slices/UserSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const isLoggedIn = useSelector((state) => state.userDetails.isLoggedIn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (
        window.localStorage.getItem("s_id") &&
        window.localStorage.getItem("s_email") &&
        window.localStorage.getItem("s_name")
      ) {
        dispatch(
          userSliceActions.logUserInWithoutCr({
            _id: window.localStorage.getItem("s_id"),
          })
        );
        setLoading(false);
      } else {
        dispatch(userSliceActions.logUserOut());
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return (
    <div className="w-full h-screen bg-slate-900">
      {!isLoggedIn && !loading && <AuthForm />}
      {isLoggedIn && !loading && <Messenger />}
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-3xl text-white">Loading....</h1>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;

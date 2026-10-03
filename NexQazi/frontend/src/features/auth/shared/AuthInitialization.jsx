import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../state/authSlice";

const AuthInitialization = ({ children }) => {
  const dispatch = useDispatch();
  const [initialization, setInitialization] = useState(true)


  
  useEffect(() => {
    (() => {
      try {
        dispatch(getMe())
        .finally(() => {
          setInitialization(false);
        });
      } catch (error) {
        console.log("error in getMe..", error);
      }
    })();
  }, []);


  if (initialization) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h2>Loading Application...</h2>
      </div>
    );
  }

  return children;
};

export default AuthInitialization;
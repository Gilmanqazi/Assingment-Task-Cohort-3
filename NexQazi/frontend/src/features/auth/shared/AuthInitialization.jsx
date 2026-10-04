import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../state/authSlice";
import { Loader2 } from "lucide-react";

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
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", gap: "12px" }}>
        <Loader2 className="animate-spin" size={40} color="#3498db" />
        <h2>Loading Application...</h2>
      </div>
    );
  }
  

  return children;
};

export default AuthInitialization;
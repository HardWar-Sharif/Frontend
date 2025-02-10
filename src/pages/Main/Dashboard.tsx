import Lottie from "lottie-react";
import animationData from "../../assets/animations/banana.json";
import { Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  return (
    <div>
      <Center pt="15vh">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: "500px" }}
        />
      </Center>
    </div>
  );
};

export default Dashboard;

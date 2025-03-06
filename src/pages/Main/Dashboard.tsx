import Lottie from "lottie-react";
import animationData from "../../assets/animations/banana.json";
import { Center } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div>
      <Center>
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

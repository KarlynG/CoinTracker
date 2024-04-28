import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/session/session";
import { Center, Loader } from "@mantine/core";

export const PublicRoutes = ({ children }: any) => {
  const { firebaseUser, isLoading } = useUserStore();
  if (isLoading)
    return (
      <Center className="center-div">
        <Loader />
      </Center>
    );

  return !firebaseUser ? children : <Navigate to="/" />;
};

export default PublicRoutes;

import {
  Center,
  Grid,
  GridCol,
  Loader,
  useComputedColorScheme,
} from "@mantine/core";
import { getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../auth/firebase";
import { useUserStore } from "../../store/session/session";
import { LoginCarousel } from "./LoginCarousel";
import { LoginForm } from "./LoginForm";
import "./style.css";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, firebaseUser } = useUserStore();
  useEffect(() => {
    const fetchUserCredentials = async () => {
      if (!firebaseUser) {
        setIsLoading(true);
        try {
          const result = await getRedirectResult(auth);
          if (result) setUser(result.user);
        } catch (error) {
          console.error("Error fetching user credentials:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserCredentials();
  }, []);

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const borderColor = computedColorScheme === "dark" ? "#242424" : "white";
  const dividerColor = computedColorScheme === "dark" ? "#302f2f" : "#f0eded";
  return (
    <>
      {isLoading ? (
        <div className="my-full-screen-container">
          <Center>
            <Loader color="blue" />
          </Center>
        </div>
      ) : (
        <div className="my-full-screen-container">
          <Grid className="container-login" grow gutter="xl">
            <GridCol
              span={{
                base: 12, // Full width on small screens (phone view)
                md: 7, // 7 columns on medium screens and above
              }}
              style={{
                borderRightColor: dividerColor,
                borderStyle: "solid",
                borderTopColor: borderColor,
                borderLeftColor: borderColor,
                borderBottomColor: borderColor,
              }}
              className="login-carousel-container"
            >
              <div className="my-full-screen-container">
                <Center>
                  <LoginCarousel />
                </Center>
              </div>
            </GridCol>

            <GridCol
              span={{
                base: 12, // Full width on small screens (phone view)
                md: 5, // 5 columns on medium screens and above
              }}
            >
              <div className="my-full-screen-container login-form">
                <Center>
                  <LoginForm />
                </Center>
              </div>
            </GridCol>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Login;

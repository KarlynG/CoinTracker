import "@mantine/core/styles.css";
import { AppRouter } from "./routes/app-router";
import { Center, Loader, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { useEffect } from "react";
import { auth } from "./auth/firebase";
import { useUserStore } from "./store/session/session";
import { Notifications } from "@mantine/notifications";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";
import useStatus from "./hooks/status/useStatus.hook";
import { CssLoader } from "./css/CssLoader";
import { NotFound } from "./components/not-found/NotFound";
const App = () => {
  const { setUser, setIsLoading } = useUserStore();
  const { data, isLoading } = useStatus();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading();
    });
    return () => unsubscribe();
  }, []);
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        components: {
          Loader: Loader.extend({
            defaultProps: {
              loaders: { ...Loader.defaultLoaders, custom: CssLoader },
              type: "custom",
            },
          }),
        },
      }}
    >
      {isLoading ? (
        <Center className="center-div">
          <Loader />
        </Center>
      ) : data ? (
        <>
          <ModalsProvider>
            <Notifications />
            {<AppRouter />}
          </ModalsProvider>
        </>
      ) : (
        <Center className="center-div">
          <NotFound />
        </Center>
      )}
    </MantineProvider>
  );
};

export default App;

import {
  ActionIcon,
  Affix,
  Box,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconFlag3 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Joyride, { Step, CallBackProps } from "react-joyride";

const DashboardJoyride = () => {
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [showPresentation] = useState(() => {
    const storedValue = localStorage.getItem("showPresentation");
    return storedValue ? JSON.parse(storedValue) : true;
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showPresentation) {
        setShowSteps(true); // Start the tour after the delay
        localStorage.setItem("showPresentation", JSON.stringify(false));
      }
    }, 2000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);
  useEffect(() => {
    localStorage.setItem("showPresentation", JSON.stringify(showPresentation));
  }, [showPresentation]);
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setShowSteps(false);
    }
  };
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const steps: Step[] = [
    {
      target: "body",
      placement: "center",
      title: "Welcome to Cointracker!",
      content: "This is a guided tour to the basics of basics.",
      disableBeacon: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: ".first-step",
      content:
        "In this chart you can see how much you have spent across all your budgets, along how much you have left.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: ".second-step",
      content: "Here you can add new transactions or budgets.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: ".third-step",
      content: "Your most used budgets will appear here",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: ".fourth-step",
      content:
        "This is a list of your latest transactions added to your account.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: "body",
      placement: "center",
      title: "That's it for now!",
      content:
        "If you want to see this onboarding again, just click the flag button in the top right corner!",
      disableBeacon: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
  ];
  return (
    <>
      <Affix position={{ top: 70, right: 20 }}>
        <Box>
          <ActionIcon
            variant="gradient"
            color="pink"
            aria-label="Flag3"
            size="lg"
            gradient={{ from: 'gray', to: 'blue', deg: 150 }}
            onClick={() => {
              setShowSteps(true);
            }}
          >
            <IconFlag3
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Box>
      </Affix>

      <Joyride
        callback={handleJoyrideCallback}
        showSkipButton
        showProgress
        continuous
        steps={steps}
        run={showSteps}
        styles={{
          options: {
            arrowColor:
              computedColorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
            backgroundColor:
              computedColorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: theme.colors.blue[6],
            textColor:
              computedColorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.dark[9],
          },
        }}
        locale={{
          last: "Finish",
          next: "Next",
          back: "Previous",
          skip: "Skip Tour",
        }}
      />
    </>
  );
};

export default DashboardJoyride;

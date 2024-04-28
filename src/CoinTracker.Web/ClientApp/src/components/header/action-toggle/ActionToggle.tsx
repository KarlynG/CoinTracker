import {
  useMantineColorScheme,
  useComputedColorScheme,
  Switch,
  rem,
} from "@mantine/core";
import classes from "./ActionToggle.module.css";

export default function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  const isDarkMode = computedColorScheme === "dark";
  const toggleColorScheme = () => {
    setColorScheme(isDarkMode ? "light" : "dark");
  };

  const handleWrapperClick = (event: any) => {
    event.stopPropagation(); // Prevent the event from bubbling up
  };

  return (
    <div
      onClick={handleWrapperClick}
      onKeyDown={handleWrapperClick} // Add keyboard listener
      style={{ width: rem(50), height: rem(16) }}
      role="switch"
      aria-checked={isDarkMode}
      tabIndex={0}
    >
      <div>
        <Switch
          style={{ width: rem(50), height: rem(16) }}
          classNames={classes}
          checked={isDarkMode}
          onClick={handleWrapperClick}
          onChange={toggleColorScheme}
          size="sm"
        />
      </div>
    </div>
  );
}

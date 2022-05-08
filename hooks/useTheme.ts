import { useEffect, useState } from "react";

import Colors from "../constants/Colors";
import { setDarkMode } from "../redux/features/appTheme/appThemeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useColorScheme from "./useColorScheme";

function useTheme() {
  const { isDark, appearance } = useAppSelector((state) => state.appTheme);
  const [theme, setTheme] = useState(isDark ? Colors.dark : Colors.light);
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appearance === "system") {
      const colorTheme = colorScheme === "dark" ? Colors.dark : Colors.light;
      setTheme(colorTheme);
      dispatch(setDarkMode(colorScheme === "dark" ? true : false));
      return;
    }
    if (isDark) {
      setTheme(Colors.dark);
    } else {
      setTheme(Colors.light);
    }
  }, [isDark, colorScheme, appearance]);

  return theme;
}

export default useTheme;

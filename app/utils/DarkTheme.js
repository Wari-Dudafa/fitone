import { MD3DarkTheme } from "react-native-paper";

// console.log(`Dark theme: ${JSON.stringify(MD3DarkTheme, undefined, 2)}`);

const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    primary: "rgb(147, 194, 68)",
    onPrimary: "rgb(47, 70, 6)",
    primaryContainer: "rgb(95, 43, 146)",
    onPrimaryContainer: "rgb(240, 219, 255)",
    secondary: "rgb(68, 144, 194)",
    onSecondary: "rgb(8, 48, 74)",
    secondaryContainer: "rgb(77, 67, 87)",
    onSecondaryContainer: "rgb(237, 221, 246)",
    tertiary: "rgb(194, 68, 81)",
    onTertiary: "rgb(63, 7, 12)",
    tertiaryContainer: "rgb(101, 58, 65)",
    onTertiaryContainer: "rgb(255, 217, 221)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(28, 30, 27)",
    onBackground: "rgb(231, 225, 229)",
    surface: "rgb(28, 30, 27)",
    onSurface: "rgb(231, 225, 229)",
    surfaceVariant: "rgb(72, 78, 69)",
    onSurfaceVariant: "rgb(204, 196, 206)",
    outline: "rgb(230, 230, 230)",
    outlineVariant: "rgb(74, 69, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(231, 225, 229)",
    inverseOnSurface: "rgb(50, 47, 51)",
    inversePrimary: "rgb(180, 235, 84)",
    elevation: {
      level0: "transparent",
      level1: "rgb(37, 41, 35)",
      level2: "rgb(43, 48, 40)",
      level3: "rgb(49, 55, 44)",
      level4: "rgb(48, 57, 46)",
      level5: "rgb(55, 62, 49)",
    },
    surfaceDisabled: "rgba(231, 225, 229, 0.12)",
    onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)",
  },
};

export default DarkTheme;

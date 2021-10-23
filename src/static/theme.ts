export interface Theme {
  primary: string;
  primaryInactive: string;
  secondary: string;
  secondaryHover: string;
  stroke: string;
  transparent: string;
  borderRadius: number;
  textDark: string;
}

const theme = {
  primary: "#333333",
  // primary: "#121212",
  // primary: "#989898",
  secondary: "#FFC300",
  secondaryHover: "#b38900",
  primaryInactive: "#4c4c4c",
  transparent: "#0000",
  stroke: "black",
  borderRadius: 10,
  textDark: "black",
};

export default theme;

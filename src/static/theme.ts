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
  primary: "#9e9e9e",
  primaryDark: "#1f1f1f",
  secondary: "#fff200",
  secondaryHover: "#b38900",
  primaryInactive: "#4c4c4c",
  transparent: "#0000",
  stroke: "black",
  border: "2px solid black",
  borderRadius: 10,
  textDark: "black",
  text: "white",
};

export default theme;

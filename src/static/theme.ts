export interface Theme {
  primary: string;
  primaryInactive: string;
  secondary: string;
  secondaryHover: string;
  stroke: string;
  transparent: string;
  borderRadius: number;
  textDark: string;
  shadow: string;
  primaryFont: string;
  bigFont: string;
  mediumFont: string;
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
  shadow: "5px 5px 15px 5px #000000",
  primaryFont: "Nunito",
  bigFont: "3.5vw",
  mediumFont: "2.5vw",
};

export default theme;

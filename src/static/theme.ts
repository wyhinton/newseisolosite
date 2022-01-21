export interface Theme {
  primary: string;
  primaryInactive: string;
  primaryMedium: string;
  secondary: string;
  secondaryRGB: number[];
  secondaryHover: string;
  stroke: string;
  transparent: string;
  borderRadius: number;
  textDark: string;
  shadow: string;
  primaryFont: string;
  titleFontFamily: string;
  bigFont: string;
  mediumFont: string;
  titleFont: string;
  logoFont: string;
}

const theme = {
  primary: "#9e9e9e",
  primaryDark: "#1f1f1f",
  primaryMedium: "rgba(100, 100, 100, 255)",
  secondary: "#fff200",
  secondaryRGB: [255, 242, 0],
  secondaryHover: "#b38900",
  primaryInactive: "#4c4c4c",
  transparent: "#0000",
  stroke: "rgba(0,0,0,0)",
  border: "2px solid black",
  // borderRadius: 0,
  borderRadius: 10,
  // borderRadius: 10,
  textDark: "black",
  text: "white",
  shadow: "5px 5px 15px 5px #000000",
  titleFontFamily: "Heming",
  // titleFontFamily: "Nunito",
  // titleFontFamily: "Mimoid",
  // titleFontFamily: "OTR type",
  // titleFontFamily: "Hoover",
  // titleFontFamily: "Aber-Mono",
  primaryFont: "OTR type",
  // primaryFont: "Nunito",
  // primaryFont: "NeueMetana-Bold",
  // primaryFont: "Aber-Mono",
  titleFont: "3vw",
  bigFont: "6.5vw",

  mediumFont: "1.5vw",
  logoFont: "Pexel",
};

export default theme;

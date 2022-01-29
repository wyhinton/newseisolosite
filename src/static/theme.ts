export interface Theme {
  padding: number;
  primary: string;
  primaryDark: string;
  primarDarkGL: [number, number, number],
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
  bigTextFont: string;
  mediumFont: string;
  titleFont: string;
  logoFont: string;
  navHeight: string;
  widgetFontSize: string;
  white: string;
  aboutBarHeight: string;
  paragraphSize: string;
}

const primaryDarkGL = [75, 75, 75].map(v => v / 255);

const theme = {
  padding: 20,
  primary: "#9e9e9e",
  // primaryDark: "#1f1f1f",
  primaryDark: "rgba(75, 75, 75, 255)",
  primaryDarkGL: primaryDarkGL,
  primaryMedium: "rgba(100, 100, 100, 255)",
  secondary: "#fff200",
  secondaryRGB: [255, 242, 0],
  secondaryHover: "rgba(100, 100, 100, .5)",
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
  headerHeight: "7vh",
  infoPopupDuraiton: .5,
  aboutBarHeight: "30vh",
  // titleFontFamily: "Nunito",
  // titleFontFamily: "Mimoid",
  // titleFontFamily: "OTR type",
  // titleFontFamily: "Hoover",
  // titleFontFamily: "Aber-Mono",
  primaryFont: "OTR type",
  // widgetFontSize: "clamp(, 20px)",
  // widgetFontSize: "min(10vh, 20px)",
  widgetFontSize: "3vmin",
  // primaryFont: "Nunito",
  // primaryFont: "NeueMetana-Bold",
  // primaryFont: "Aber-Mono",
  // titleFont: "clamp(3vw, 14px, 8vw)",
  titleFont: "3vmin",

  // bigFont: "6.5vw",
  bigFont: "min(10.5vh, 100px)",
  // bigTextFont: "min(40px, 41vh)",
  bigTextFont: "6vmin",
  white: "#FFFFFF",
  mediumFont: "1.5vw",
  logoFont: "Pexel",
  // navHeight: "7vh",
  navHeight: "7vmin",
  // navHeight: "max(5vw, 30px)",
  scale: "calc( 0.5333333333px + 0.4666666667 * ( 100vh - 480px ) / 420 )",
  appBarHeight: "7vmin",
  paragraphSize: "max(3vmin, 20px)",
};

export default theme;

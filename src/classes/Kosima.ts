type KosimaReaction =
  | "KOSIMA_SURPRISE"
  | "KOSIMA_QUESTION"
  | "KOSIMA_THINKING"
  | "KOSIMA_NEUTRAL";

class Kosima {
  static KosimaFolder = process.env.PUBLIC_URL + "/Kosima/";
  reaction!: KosimaReaction;
  constructor() {
    this.reaction = "KOSIMA_NEUTRAL";
  }

  reactionImage() {
    console.log(Kosima.KosimaFolder + this.reaction + ".svg");
    return Kosima.KosimaFolder + this.reaction + ".svg";
  }
  baseImage() {
    return Kosima.KosimaFolder + "KOSIMA_NEUTRAL" + ".svg";
  }
  setReaction(reaction: KosimaReaction) {
    this.reaction = reaction;
  }
}

export default Kosima;

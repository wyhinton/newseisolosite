import Clip from "./Clip";
import DawElement from "./DawElement";

export default interface DawTrack extends DawElement {
    clips: Clip[];
}

import dawMod from "./dawMod";
import { createStore, action } from "easy-peasy";
import logger from "redux-logger";

const dawStore = createStore(dawMod, {
    name: "homeStore",
    devTools: process.env.NODE_ENV === "development",
    middleware: [
        // logger
    ],
    // initialState: { commentsModel: { comments }, postsModel: { posts } },
});

// if (process.env.NODE_ENV === "development") {
//   if (module.hot) {
//     module.hot.accept("../model/homeModel", () => {
//       homeStore.reconfigure(homeModel); // 👈 Here is the magic
//     });
//   }
// }
export default dawStore;

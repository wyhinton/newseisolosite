// import homeModel from "model/homeModel";
import { createStore, action } from "easy-peasy";
import homeModel from "./model/homeModel";
import logger from "redux-logger";

const homeStore = createStore(homeModel, {
  name: "homeStore",
  devTools: process.env.NODE_ENV === "development",
  middleware: [
    // logger
  ],
  // initialState: { commentsModel: { comments }, postsModel: { posts } },
});

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./model", () => {
      homeStore.reconfigure(homeModel); // 👈 Here is the magic
    });
  }
}
export default homeStore;

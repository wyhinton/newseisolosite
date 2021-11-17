import { createStore, action } from "easy-peasy";
import model from "./model";
import logger from "redux-logger";
// const store = createStore(model);

const store = createStore(model, {
  devTools: process.env.NODE_ENV === "development",
  middleware: [
    // logger
  ],
  // initialState: { commentsModel: { comments }, postsModel: { posts } },
});

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./model", () => {
      store.reconfigure(model); // 👈 Here is the magic
    });
  }
}

export default store;

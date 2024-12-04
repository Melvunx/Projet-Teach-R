import { configureStore } from "@reduxjs/toolkit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { getCategory } from "./actions/category.action.ts";
import { getProduct } from "./actions/product.action.ts";
import App from "./App.tsx";
import "./index.css";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getProduct());
store.dispatch(getCategory());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

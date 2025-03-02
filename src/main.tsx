import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./pages/App/App.tsx";
import { CurrentViewProvider } from "./context/current-view/CurrentViewProvider.tsx";
import { ParallaxProvider } from "react-scroll-parallax";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CurrentViewProvider>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </CurrentViewProvider>
  </BrowserRouter>,
);

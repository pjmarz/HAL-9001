import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Welcome from "./components/Welcome";
import SelectionMenu from "./pages/SelectionMenu";
import ActionConfirmationPage from "./pages/ActionConfirmationPage";
import DataReturnPage from "./pages/DataReturnPage";
import IdentificationPage from "./pages/IdentificationPage";
import UpdateDatabase from "./pages/UpdateDatabase";
import LightsControlPanel from "./pages/LightsControlPanel";
import SpotifyMenu from "./pages/SpotifyMenu";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/selection-menu":
        title = "";
        metaDescription = "";
        break;
      case "/action-confirmation-page":
        title = "";
        metaDescription = "";
        break;
      case "/data-return-page":
        title = "";
        metaDescription = "";
        break;
      case "/identification-page":
        title = "";
        metaDescription = "";
        break;
      case "/update-database":
        title = "";
        metaDescription = "";
        break;
      case "/lights-control-panel":
        title = "";
        metaDescription = "";
        break;
      case "/spotify-menu":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/selection-menu" element={<SelectionMenu />} />
      <Route
        path="/action-confirmation-page"
        element={<ActionConfirmationPage />}
      />
      <Route path="/data-return-page" element={<DataReturnPage />} />
      <Route path="/identification-page" element={<IdentificationPage />} />
      <Route path="/update-database" element={<UpdateDatabase />} />
      <Route path="/lights-control-panel" element={<LightsControlPanel />} />
      <Route path="/spotify-menu" element={<SpotifyMenu />} />
    </Routes>
  );
}
export default App;

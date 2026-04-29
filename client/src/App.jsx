import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PokedexHomePage from "./pages/PokemonHomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Toaster theme="dark" position="top-center" richColors />
      <Routes>
        <Route path="/" element={<PokedexHomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import MainMenu from "./pages/MainMenu";
import SkinsMenu from "./pages/SkinsMenu";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainMenu />} />
                <Route path="/game" element={<Game />} />
                <Route path="/skins" element={<SkinsMenu />} />
            </Routes>
        </>
    );
}

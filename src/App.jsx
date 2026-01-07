import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import MainMenu from "./pages/MainMenu";
import SkinsMenu from "./pages/SkinsMenu";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        const sound = new Audio("/sounds/click.wav");

        const handler = e => {
            if (e.target.closest("button")) {
                sound.currentTime = 0;
                sound.play();
            }
        };

        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

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

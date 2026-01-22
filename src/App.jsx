import { Route, Routes, useLocation } from "react-router-dom";
import Game from "./pages/Game";
import MainMenu from "./pages/MainMenu";
import SkinsMenu from "./pages/SkinsMenu";
import { useEffect } from "react";
import OptionsMenu from "./pages/OptionsMenu";

import "./App.scss"
import CreditsMenu from "./pages/CreditsMenu";
import HowToPlay from "./pages/HowToPlay";

export default function App() {
    const location = useLocation();

    useEffect(() => {
        document.body.className = "";

        if (location.pathname === "/") {
            document.body.classList.add("bg-home");
        } else {
            document.body.classList.add("bg-gray-dots");
        }
    }, [location.pathname]);

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
        <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game" element={<Game />} />
            <Route path="/skins" element={<SkinsMenu />} />
            <Route path="/options" element={<OptionsMenu />} />
            <Route path="/credits" element={<CreditsMenu />} />
            <Route path="/howtoplay" element={<HowToPlay />} />
        </Routes>
    );
}

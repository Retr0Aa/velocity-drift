export default function MainMenu() {
    return (
        <div className="main-menu">
            <h1 className="main-menu-title">Velocity Drift</h1>

            <div className="main-menu-buttons">
                <button className="btn" onClick={() => window.location.href = "/game"}>PLAY</button>
                <button className="btn btn-purple" onClick={() => window.location.href = "/skins"}>SKINS</button>
                <button className="btn btn-purple" onClick={() => window.location.href = "/skins"}>OPTIONS</button>
            </div>

            {/* <div className="best-score">
                <h2>Best Score: {localStorage.getItem('bestScore') || 0}</h2>
            </div> */}

            {/* <p>Made with React + Vite by Alexander Buchkov</p> */}
        </div>
    );
}

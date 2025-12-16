export default function MainMenu() {
    return (
        <div className="main-menu">
            <h1>Velocity Drift</h1>

            <button onClick={() => window.location.href = "/game"}>Start Game</button>
            <button className="btn-purple" onClick={() => window.location.href = "/skins"}>Skins</button>

            <div className="best-score">
                <h2>Best Score: {localStorage.getItem('bestScore') || 0}</h2>
            </div>

            <p>Made with React + Vite by Alexander Buchkov</p>
        </div>
    );
}

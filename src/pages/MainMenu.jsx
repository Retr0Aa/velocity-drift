export default function MainMenu() {
    return (
        <div className="main-menu">
            <h1>Game Name</h1>

            <button onClick={() => window.location.href = "/game"}>Start Game</button>
            <button disabled onClick={() => window.location.href = "/game"}>Skins</button>

            <div className="best-score">
                <h2>Best Score: {localStorage.getItem('bestScore') || 0}</h2>
            </div>
        </div>
    );
}

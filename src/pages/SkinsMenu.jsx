import { skins } from "../skins";

export default function SkinsMenu() {
  const bestScore = Number(localStorage.getItem("bestScore") || 0);
  const equipped = localStorage.getItem("equippedSkin") || "default";

  function equipSkin(id) {
    localStorage.setItem("equippedSkin", id);
    window.location.reload();
  }

  return (
    <div className="skins-menu">
      <h1>Skins</h1>
      <h2>Best Score: {bestScore}</h2>

      <div className="skins-grid">
        {skins.map(skin => {
          const unlocked = bestScore >= skin.cost;
          const isEquipped = equipped === skin.id;

          return (
            <button
              key={skin.id}
              className={`skin-card ${isEquipped ? "equipped" : ""}`}
              disabled={!unlocked}
              onClick={() => unlocked && equipSkin(skin.id)}
            >
              {/* preview */}
              <div
                className="skin-preview"
                style={{ borderColor: skin.color }}
              >
                <svg width="40" height="40">
                  <polygon
                    points="5,5 5,35 35,20"
                    fill="none"
                    stroke={skin.color}
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* status */}
              <div className={`skin-status ${isEquipped ? "green" : ""}`}>
                {isEquipped
                  ? "Equipped"
                  : unlocked
                  ? "Equip"
                  : `Score ${skin.cost}`}
              </div>
            </button>
          );
        })}
      </div>

      <button className="btn-danger" onClick={() => (window.location.href = "/")}>
        Back
      </button>
    </div>
  );
}

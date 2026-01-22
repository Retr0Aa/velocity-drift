import React from 'react';
import { skins } from "../skins";

export default function SkinsMenu() {
  const bestScore = Number(localStorage.getItem("bestScore") || 0);
  const equipped = localStorage.getItem("equippedSkin") || "default";

  function equipSkin(id) {
    localStorage.setItem("equippedSkin", id);
    window.location.reload();
  }

  return (
    <div className="options-screen skins-screen">
      <div className="options-container">
        <h1 className="title">Skins</h1>

        <div className="skins-grid">
          {skins.map(skin => {
            const unlocked = bestScore >= skin.cost;
            const isEquipped = equipped === skin.id;

            return (
              <div
                key={skin.id}
                className={`skin-card-wrapper ${unlocked ? 'unlocked' : 'locked'}`}
                onClick={() => unlocked && equipSkin(skin.id)}
              >
                <div className="skin-card">
                  <div className="skin-preview">
                    <svg width="60" height="60" viewBox="0 0 40 40">
                      <polygon
                        points="5,5 5,35 35,20"
                        fill="none"
                        stroke={true ? skin.color : "#444"}
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <div className={`skin-status ${isEquipped ? "selected" : ""}`}>
                    {isEquipped ? "SELECTED" : unlocked ? "CLAIMED" : skin.cost}
                  </div>
                </div>
                {/* The shadow/offset effect seen in the image */}
                <div className="card-shadow"></div>
              </div>
            );
          })}
        </div>

        <div className="footer">
          <button onClick={() => (window.location.href = "/")} className="back-btn">
            BACK
          </button>
        </div>
      </div>
      <div className="overlay-dots"></div>
    </div>
  );
}

import React from 'react';

export default function HowToPlay() {
    return (
        <div className="options-screen how-to-play-screen">
            <div className="options-container">
                <h1 className="title">How to Play</h1>

                <div className="instructions-list">
                    <div className="instruction-line">
                        MOVEMENT: <span className="highlight">CLICK AND HOLD YOUR MOUSE AND DRAG IT UP OR DOWN</span>
                    </div>
                    <div className="instruction-line">
                        BLUE DOTS: <span className="highlight">COLLECT THEM TO GAIN POINTS</span>
                    </div>
                    <div className="instruction-line">
                        RED DOTS & WALLS: <span className="highlight">AVOID THEM AT ALL COST</span>
                    </div>
                    <div className="instruction-line">
                        PORTALS: <span className="highlight">GO THROUGH THEM AND SEE WHAT HAPPENS... (THEY ALSO GIVE PORTAL POINTS)</span>
                    </div>
                </div>

                <div className="footer">
                    <button
                        onClick={() => window.location.href = "/"}
                        className="btn back-btn"
                    >
                        BACK
                    </button>
                </div>
            </div>
        </div>
    );
}

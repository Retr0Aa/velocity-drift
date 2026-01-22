import React from 'react';

export default function CreditsMenu() {
    return (
        <div className="options-screen credits-screen">
            <div className="options-container">
                <h1 className="title">Credits</h1>

                <div className="credits-content">
                    <div className="credit-line">
                        DEVELOPER: <span className="highlight">ALEXANDER BUCHKOV</span>
                    </div>
                    <div className="credit-line">
                        DESIGNER: <span className="highlight">EMMANUEL OLIMPIEV</span>
                    </div>
                    <div className="credit-line">
                        FONTS: TITLES - <span className="highlight">LEAGUE GOTHIC</span>
                    </div>
                    <div className="credit-line indent">
                        TEXTS - <span className="highlight">BUILT TITLING</span>
                    </div>
                </div>

                <div className="footer">
                    <button 
                        onClick={() => window.location.href = "/options"} 
                        className="back-btn hover-arrows"
                    >
                        « BACK
                    </button>
                </div>
            </div>
            {/* Reusing the background dot pattern logic if you have it in your CSS */}
            <div className="overlay-dots"></div>
        </div>
    );
}

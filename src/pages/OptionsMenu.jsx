import React, { useState } from 'react';

export default function OptionsMenu() {
    const [sound, setSound] = useState(0);

    return (
        <div className="options-screen">
            <div className="options-container">
                <h1 className="title">Options</h1>

                <div className="options-list">
                    {/* Sound Control */}
                    <div className="control">
                        <span className="label">SOUND</span>
                        <div className="slider-container">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={sound} 
                                className="slider" 
                                onChange={(e) => setSound(e.target.value)}
                            />
                            <span className="percentage">{sound}%</span>
                        </div>
                    </div>

                    {/* Theme Control */}
                    <div className="control">
                        <span className="label">THEME</span>
                        <div className="theme-toggle">
                            <button className="icon-btn">☀</button>
                            <span className="separator">/</span>
                            <button className="icon-btn">☾</button>
                        </div>
                    </div>

                    <br />

                    {/* Navigation Buttons */}
                    <button onClick={() => window.location.href = "/credits"} className="menu-btn">CREDITS</button>
                    <button onClick={() => window.location.href = "/howtoplay"} className="menu-btn">HOW TO PLAY</button>
                </div>

                <div className="footer">
                    <button onClick={() => window.location.href = "/"} className="btn back-btn">BACK</button>
                </div>
            </div>
        </div>
    );
}
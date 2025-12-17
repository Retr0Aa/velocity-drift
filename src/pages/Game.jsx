import { useEffect, useRef, useState } from "react";

import { skins } from "../skins";

const deathSound = new Audio("/sounds/explosion.wav");
const pickupSound = new Audio("/sounds/pickupCoin.wav");

const skinId = localStorage.getItem("equippedSkin") || "classic";
const equippedSkin =
  skins.find(s => s.id === skinId) || skins[0];

export default function Game() {
  const canvasRef = useRef(null);

  const player = useRef({ x: 160, y: 300, targetY: 300, size: 24 });
  const obstacles = useRef([]);
  const collectibles = useRef([]);
  const keys = useRef({});
  const mouse = useRef({ down: false });
  const score = useRef(0);

  const [dead, setDead] = useState(false);

  const skinId = localStorage.getItem("equippedSkin") || "default";

  const BASE_SPEED = 0.6;
  const MAX_SPEED = 1.6;
  const SPEED_RAMP = 0.00002;
  const GAP_SIZE = 230;
  const LERP_SPEED = 0.035;
  const speed = useRef(BASE_SPEED);

  const particles = useRef([]);

  const hasPlayedDeathSound = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resetGame() {
      obstacles.current = [];
      collectibles.current = [];
      score.current = 0;
      speed.current = BASE_SPEED;
      player.current.y = canvas.height / 2;
      player.current.targetY = player.current.y;
      mouse.current.down = false;
      setDead(false);
    }

    const keyDown = e => (keys.current[e.key] = true);
    const keyUp = e => (keys.current[e.key] = false);

    const mouseMove = e => {
      if (!mouse.current.down || dead) return;
      const rect = canvas.getBoundingClientRect();
      player.current.targetY = e.clientY - rect.top;
    };

    const mouseDown = e => e.button === 0 && (mouse.current.down = true);
    const mouseUp = () => (mouse.current.down = false);

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("blur", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);

    let lastSpawn = 0;
    let lastTime = performance.now();

    function spawnWallPair() {
      const gapY = 80 + Math.random() * (canvas.height - GAP_SIZE - 160);
      const x = canvas.width + Math.random() * 400;
      obstacles.current.push(
        { x, y: 0, w: 30, h: gapY, color: "gray" },
        { x, y: gapY + GAP_SIZE, w: 30, h: canvas.height, color: "gray" }
      );
    }

    function spawnEnemy() {
      obstacles.current.push({
        x: canvas.width + Math.random() * 400,
        y: Math.random() * (canvas.height - 30),
        w: 22,
        h: 22,
        color: "red",
        scale: 0.8 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 0.4
      });
    }

    function spawnCollectible() {
      collectibles.current.push({
        x: canvas.width + Math.random() * 400,
        y: Math.random() * (canvas.height - 20),
        r: 6
      });
    }

    function hit(a, b) {
      return (
        a.x < b.x + b.w &&
        a.x + a.size > b.x &&
        a.y < b.y + b.h &&
        a.y + a.size > b.y
      );
    }

    function hitCircle(a, c) {
      const dx = a.x - c.x;
      const dy = a.y - c.y;
      return Math.sqrt(dx * dx + dy * dy) < a.size;
    }

    function update(delta) {
      if (dead) return;

      if (!dead)
        speed.current = Math.min(MAX_SPEED, speed.current + delta * SPEED_RAMP);

      if (keys.current["ArrowUp"] || keys.current["w"]) player.current.targetY -= 3;
      if (keys.current["ArrowDown"] || keys.current["s"]) player.current.targetY += 3;

      player.current.y += (player.current.targetY - player.current.y) * LERP_SPEED;
      player.current.y = Math.max(0, Math.min(canvas.height - player.current.size, player.current.y));

      obstacles.current.forEach(o => (o.x -= speed.current));
      collectibles.current.forEach(c => (c.x -= speed.current));

      obstacles.current = obstacles.current.filter(o => o.x + o.w > 0);

      collectibles.current = collectibles.current.filter(c => {
        if (hitCircle(player.current, c)) {
          score.current++;
          pickupSound.currentTime = 0;
          pickupSound.play();
          return false;
        }
        return true;
      });

      if (Math.abs(player.current.targetY - player.current.y) > 0.5 && !dead) {
        particles.current.push({
          x: player.current.x - 10,
          y: player.current.y,
          alpha: 0.5,
          size: 6 + Math.random() * 4
        });
      }

      for (const o of obstacles.current) {
        if (hit(player.current, o)) {
          if (!hasPlayedDeathSound.current) {
            hasPlayedDeathSound.current = true;
            deathSound.currentTime = 0;
            deathSound.play();
          }

          mouse.current.down = false;
          speed.current = 0;
          setDead(true);
          return;
        }
      }

      collectibles.current = collectibles.current.filter(c => {
        if (hitCircle(player.current, c)) {
          score.current++;
          return false;
        }
        return true;
      });

      particles.current.forEach(p => {
        p.x -= speed.current;       // move left with game
        p.size *= 0.95;             // shrink
        p.alpha *= 0.95;            // fade
      });
      particles.current = particles.current.filter(p => p.alpha > 0.02);
    }

    function drawRocket() {
      ctx.save();
      ctx.translate(player.current.x, player.current.y);
      ctx.rotate(Math.atan2(player.current.targetY - player.current.y, 140));
      ctx.shadowColor = "white";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;

      ctx.strokeStyle = equippedSkin.color;
      ctx.shadowColor = equippedSkin.color;

      ctx.beginPath();
      ctx.moveTo(-12, -12);
      ctx.lineTo(-12, 12);
      ctx.lineTo(20, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "white";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      drawRocket();

      obstacles.current.forEach(o => {
        ctx.save();
        ctx.translate(o.x + o.w / 2, o.y + o.h / 2);
        ctx.shadowBlur = 12;
        ctx.shadowColor = o.color;
        if (o.color === "red") {
          ctx.rotate(o.rotation);
          ctx.scale(o.scale, o.scale);
        }
        ctx.fillStyle = o.color;
        ctx.fillRect(-o.w / 2, -o.h / 2, o.w, o.h);
        ctx.restore();
      });

      collectibles.current.forEach(c => {
        ctx.save();
        ctx.shadowColor = "cyan";
        ctx.shadowBlur = 15;
        ctx.fillStyle = "cyan";
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.fillStyle = "white";
      ctx.font = "20px monospace";
      ctx.fillText(`Score: ${score.current}`, 20, 30);
    }

    function loop(time) {
      const delta = time - lastTime;
      lastTime = time;

      if (!dead && time - lastSpawn > 1200) {
        const r = Math.random();
        if (r < 0.4) spawnEnemy();
        else if (r < 0.8) spawnWallPair();
        else spawnCollectible();
        lastSpawn = time;
      }

      update(delta);
      draw();
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("blur", mouseUp);
    };
  }, [dead]);

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        style={{ filter: dead ? "blur(4px) brightness(0.5)" : "none" }}
      />

      {dead && (
        <div className="death-screen">
          <h1>YOU DIED</h1>
          <button className="button" onClick={() => {
            if (score.current > (localStorage.getItem('bestScore') || 0))
              localStorage.setItem('bestScore', score.current);

            window.location.reload();
          }}>
            Retry
          </button>
          <button className="button btn-danger" onClick={() => {
            if (score.current > (localStorage.getItem('bestScore') || 0))
              localStorage.setItem('bestScore', score.current);

            window.location.href = "/";
          }}>
            Main Menu
          </button>
        </div>
      )}
    </div>
  );
}

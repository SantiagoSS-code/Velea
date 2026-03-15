/**
 * constellation.js
 * Animated particle network for the Community Love section background.
 * Draws 55 nodes connected by fading lines when within MAX_DIST px.
 */

(function () {
  'use strict';

  const NS       = 'http://www.w3.org/2000/svg';
  const NUM_NODES = 55;
  const MAX_DIST  = 160;  // px — connect nodes within this distance
  const SPEED     = 0.28; // px per animation frame

  let svg, nodes = [], lineEls = [], circEls = [], animId;

  function rand(min, max) { return min + Math.random() * (max - min); }
  function W() { return svg.clientWidth  || svg.parentElement.clientWidth  || 1200; }
  function H() { return svg.clientHeight || svg.parentElement.clientHeight || 700; }

  /** Spawn nodes at random positions */
  function init() {
    nodes = [];
    const w = W(), h = H();
    for (let i = 0; i < NUM_NODES; i++) {
      nodes.push({
        x:  rand(0, w),
        y:  rand(0, h),
        vx: rand(-SPEED, SPEED) || 0.1,
        vy: rand(-SPEED, SPEED) || 0.1,
        r:  rand(1, 2.2),
        opacity: rand(0.25, 0.65)
      });
    }
  }

  /** Pre-create all SVG elements (faster than creating per frame) */
  function buildElements() {
    svg.innerHTML = '';
    lineEls = [];
    circEls = [];

    const maxLines = NUM_NODES * (NUM_NODES - 1) / 2;
    for (let i = 0; i < maxLines; i++) {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('stroke', 'rgba(255,255,255,0)');
      line.setAttribute('stroke-width', '0.8');
      svg.appendChild(line);
      lineEls.push(line);
    }

    for (let i = 0; i < NUM_NODES; i++) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('fill', 'rgba(255,255,255,0.5)');
      svg.appendChild(c);
      circEls.push(c);
    }
  }

  /** Update node positions, bounce off walls */
  function update() {
    const w = W(), h = H();
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) { n.vx *= -1; n.x = Math.max(0, Math.min(w, n.x)); }
      if (n.y < 0 || n.y > h) { n.vy *= -1; n.y = Math.max(0, Math.min(h, n.y)); }
    }
  }

  /** Write updated positions to SVG elements */
  function draw() {
    let li = 0;
    for (let i = 0; i < NUM_NODES; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < NUM_NODES; j++) {
        const b   = nodes[j];
        const dx  = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const el  = lineEls[li++];
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.22;
          el.setAttribute('x1', a.x); el.setAttribute('y1', a.y);
          el.setAttribute('x2', b.x); el.setAttribute('y2', b.y);
          el.setAttribute('stroke', `rgba(255,255,255,${alpha.toFixed(3)})`);
        } else {
          el.setAttribute('stroke', 'rgba(255,255,255,0)');
        }
      }
    }

    for (let i = 0; i < NUM_NODES; i++) {
      const n = nodes[i];
      circEls[i].setAttribute('cx', n.x);
      circEls[i].setAttribute('cy', n.y);
      circEls[i].setAttribute('r',  n.r);
      circEls[i].setAttribute('fill', `rgba(255,255,255,${n.opacity})`);
    }
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  function restart() {
    cancelAnimationFrame(animId);
    init();
    buildElements();
    loop();
  }

  /** Boot after DOM is ready */
  function boot() {
    svg = document.getElementById('constellation-canvas');
    if (!svg) return;
    init();
    buildElements();
    loop();
    window.addEventListener('resize', restart);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

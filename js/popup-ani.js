const $canvasStage = document.querySelector('#t_pop_canvas-stage');
if ($canvasStage) popupAni();

function popupAni() {
  const stage = document.getElementById('t_pop_canvas-stage');
  const jar = document.getElementById('pointJar');
  const pointEl = document.getElementById('pointValue');
  let points = 1230;
  let speed = 1;
  const canvasStageFlySpeed = Number($canvasStage.dataset.fly);

  document.querySelectorAll('input[name="spd"]').forEach((r) => {
    r.addEventListener('change', (e) => {
      speed = parseFloat(e.target.value);
    });
  });

  // 타이밍 (ms) — CSS 변수와 동기화
  const T = { pop: 400, hold: 900, morph: 950, fly: 900 };
  if (canvasStageFlySpeed) {
    T.fly = canvasStageFlySpeed;
  }
  const t = (k) => T[k] / speed;

  function setSpeedVars() {
    const root = document.documentElement.style;
    root.setProperty('--t-pop', t('pop') + 'ms');
    root.setProperty('--t-morph', t('morph') + 'ms');
    root.setProperty('--t-fly', t('fly') + 'ms');
  }

  function jarCenter() {
    const r = jar.getBoundingClientRect();
    return { x: r.left + r.width * 0.28, y: r.top + r.height / 2 }; // 동전 아이콘 위치로 흡수
  }

  function comma(n) {
    return n.toLocaleString('ko-KR');
  }

  function spawnSparks(x, y) {
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('div');
      s.className = 'spark';
      const a = (Math.PI * 2 * i) / 8,
        d = 18 + Math.random() * 14;
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.setProperty('--dx', Math.cos(a) * d + 'px');
      s.style.setProperty('--dy', Math.sin(a) * d + 'px');
      stage.appendChild(s);
      setTimeout(() => s.remove(), 600);
    }
  }

  function run() {
    setSpeedVars();

    // ① 토스트 등장
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = '<div class="toast_content" data-scale="true">1P가 적립되었습니다!</div>';
    stage.appendChild(toast);

    // 토스트 중심 좌표 (모프 기준점)
    let cx, cy;
    requestAnimationFrame(() => {
      const r = toast.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
    });

    // ③ 변환: 글자 축소 페이드 + 동전 크로스페이드
    setTimeout(
      () => {
        toast.classList.remove('show');
        toast.classList.add('morph-out');

        const coin = document.createElement('div');
        coin.className = 'fly-coin morph-in';
        coin.style.left = cx + 'px';
        coin.style.top = cy + 'px';
        stage.appendChild(coin);

        // ④ 흡수 비행 (베지어 곡선 + 축소)
        setTimeout(() => {
          toast.remove();
          coin.classList.remove('morph-in');
          const from = { x: cx, y: cy };
          const to = jarCenter();
          // 제어점: 위로 살짝 떠올랐다가 통으로 빨려 들어가는 궤적
          const ctrl = { x: (from.x + to.x) / 2 + 40, y: Math.min(from.y, to.y) - 90 };
          const dur = t('fly');
          const start = performance.now();
          let lastTrail = 0;

          function frame(now) {
            let p = (now - start) / dur;
            if (p > 1) p = 1;
            // ease-in: 빨려 들어갈수록 가속
            const e = p * p * (3 - 2 * p) * 0.4 + p * p * 0.6;
            const ix = (1 - e) * (1 - e) * from.x + 2 * (1 - e) * e * ctrl.x + e * e * to.x;
            const iy = (1 - e) * (1 - e) * from.y + 2 * (1 - e) * e * ctrl.y + e * e * to.y;
            const sc = 1 - e * 0.85; // scale 1 → 0.15
            const rot = e * 540; // 비행 중 스핀
            coin.style.left = ix + 'px';
            coin.style.top = iy + 'px';
            coin.style.transform = `translate(-50%,-50%) scale(${sc}) rotateY(${rot}deg)`;
            coin.style.opacity = p > 0.92 ? String(1 - (p - 0.92) / 0.08) : '1';

            if (now - lastTrail > 45 && p < 0.9) {
              lastTrail = now;
              const tr = document.createElement('div');
              tr.className = 'trail';
              tr.style.left = ix + 'px';
              tr.style.top = iy + 'px';
              stage.appendChild(tr);
              setTimeout(() => tr.remove(), 520);
            }

            if (p < 1) {
              requestAnimationFrame(frame);
            } else {
              coin.remove();
              // ⑤ 도착 리액션
              const c = jarCenter();
              spawnSparks(c.x, c.y);
              jar.classList.remove('bounce');
              void jar.offsetWidth;
              jar.classList.add('bounce');
              points += 1;
              pointEl.classList.remove('tick');
              void pointEl.offsetWidth;
              pointEl.textContent = comma(points);
              pointEl.classList.add('tick');
            }
          }
          requestAnimationFrame(frame);
        }, t('morph'));
      },
      t('pop') + t('hold'),
    );
  }

  run();
}

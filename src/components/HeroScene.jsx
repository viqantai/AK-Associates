"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ============ RENDERER / SCENE / CAMERA ============
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0f1a, 25, 70);

    const camera = new THREE.PerspectiveCamera(
      55, mount.clientWidth / mount.clientHeight, 0.1, 120
    );
    camera.position.set(0, 6, 24);

    const disposables = [];
    const track = (o) => (disposables.push(o), o);

    const GRAY = 0x64748b;
    const RED = 0xef4444;
    const YELLOW = 0xfacc15;
    const AMBER = 0xf59e0b;

    const lineMat = (color, opacity = 0.6) =>
      track(new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
    const solidMat = (color, opacity = 0.9) =>
      track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity }));

    const wireBox = (w, h, d, color, opacity) => {
      const geo = track(new THREE.BoxGeometry(w, h, d));
      return new THREE.LineSegments(
        track(new THREE.EdgesGeometry(geo)), lineMat(color, opacity)
      );
    };
    const wireCyl = (rt, rb, h, seg, color, opacity) => {
      const geo = track(new THREE.CylinderGeometry(rt, rb, h, seg));
      return new THREE.LineSegments(
        track(new THREE.EdgesGeometry(geo)), lineMat(color, opacity)
      );
    };

    // ============ BLUEPRINT GRID ============
    scene.add(new THREE.GridHelper(140, 70, 0x334155, 0x1e293b));

    // ============ DETAILED BUILDINGS (floors + windows) ============
    const buildings = [];
    const windowGeo = track(new THREE.PlaneGeometry(0.22, 0.3));

    for (let i = 0; i < 40; i++) {
      const w = 1.4 + Math.random() * 1.6;
      const d = 1.4 + Math.random() * 1.6;
      const floors = 2 + Math.floor(Math.random() * 8);
      const floorH = 1.1;
      const h = floors * floorH;
      const isRed = Math.random() < 0.15;
      const color = isRed ? RED : GRAY;

      const group = new THREE.Group();

      // outer shell
      group.add(wireBox(w, h, d, color, isRed ? 0.9 : 0.5).translateY(h / 2));

      // floor slab lines — one rectangle outline per floor
      const floorPts = [];
      for (let f = 1; f < floors; f++) {
        const y = f * floorH;
        const hw = w / 2, hd = d / 2;
        floorPts.push(
          new THREE.Vector3(-hw, y, -hd), new THREE.Vector3(hw, y, -hd),
          new THREE.Vector3(hw, y, -hd),  new THREE.Vector3(hw, y, hd),
          new THREE.Vector3(hw, y, hd),   new THREE.Vector3(-hw, y, hd),
          new THREE.Vector3(-hw, y, hd),  new THREE.Vector3(-hw, y, -hd)
        );
      }
      const floorGeo = track(new THREE.BufferGeometry().setFromPoints(floorPts));
      group.add(new THREE.LineSegments(floorGeo, lineMat(color, 0.25)));

      // lit windows on front face (small amber planes, random on/off)
      const winCols = Math.max(2, Math.floor(w / 0.55));
      for (let f = 0; f < floors; f++) {
        for (let c = 0; c < winCols; c++) {
          if (Math.random() > 0.35) continue; // only ~35% windows lit
          const win = new THREE.Mesh(windowGeo, solidMat(AMBER, 0.7));
          win.position.set(
            -w / 2 + 0.4 + c * 0.55,
            f * floorH + 0.55,
            d / 2 + 0.01
          );
          group.add(win);
        }
      }

      let x = (Math.random() - 0.5) * 64;
      let z = -Math.random() * 42 + 4;
      if (Math.abs(x) < 5.5) x += Math.sign(x || 1) * 9;      // keep street clear
      if (x > 6 && x < 17 && z > -15 && z < -1) x += 13;      // keep crane area clear

      group.position.set(x, 0, z);
      group.scale.y = 0.001;
      group.userData = {
        targetH: h,
        delay: Math.random() * 2.2,
        speed: 0.6 + Math.random() * 0.8,
      };
      scene.add(group);
      buildings.push(group);
    }

    // ============ TOWER CRANE ============
    const crane = new THREE.Group();
    const mastH = 14;
    // mast with cross-brace segments (more detailed than one box)
    for (let s = 0; s < 7; s++) {
      const seg = wireBox(0.8, 2, 0.8, YELLOW, 0.85);
      seg.position.y = s * 2 + 1;
      crane.add(seg);
    }
    const craneTop = new THREE.Group();
    craneTop.position.y = mastH;

    const jib = wireBox(12, 0.6, 0.6, YELLOW, 0.85);
    jib.position.x = 6;
    craneTop.add(jib);
    const counterJib = wireBox(4, 0.6, 0.6, YELLOW, 0.85);
    counterJib.position.x = -2;
    craneTop.add(counterJib);
    const counterWeight = wireBox(1, 1, 1, GRAY, 0.7);
    counterWeight.position.set(-3.5, -0.5, 0);
    craneTop.add(counterWeight);
    const cab = wireBox(1, 1, 1, RED, 0.9);
    cab.position.y = 0.8;
    craneTop.add(cab);

    // tower peak + tie lines
    const peakPts = [
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 2.2, 0),
      new THREE.Vector3(0, 2.2, 0), new THREE.Vector3(10, 0.3, 0),
      new THREE.Vector3(0, 2.2, 0), new THREE.Vector3(-3.5, 0.3, 0),
    ];
    craneTop.add(new THREE.LineSegments(
      track(new THREE.BufferGeometry().setFromPoints(peakPts)),
      lineMat(YELLOW, 0.7)
    ));

    const cableGeo = track(new THREE.BufferGeometry());
    cableGeo.setFromPoints([new THREE.Vector3(10, 0, 0), new THREE.Vector3(10, -6, 0)]);
    const cable = new THREE.Line(cableGeo, lineMat(0x94a3b8, 0.8));
    craneTop.add(cable);

    const load = wireBox(1.6, 0.5, 0.5, RED, 0.95);
    load.position.set(10, -6, 0);
    craneTop.add(load);

    crane.add(craneTop);
    crane.position.set(12, 0, -9);
    scene.add(crane);

    // ============ SCAFFOLDED HALF-BUILT BUILDING ============
    const scaffold = new THREE.Group();
    const sW = 3, sH = 7, levels = 4;
    for (let lv = 0; lv <= levels; lv++) {
      const frame = new THREE.LineSegments(
        track(new THREE.EdgesGeometry(track(new THREE.PlaneGeometry(sW, sW)))),
        lineMat(GRAY, 0.5)
      );
      frame.rotation.x = -Math.PI / 2;
      frame.position.y = (sH / levels) * lv;
      scaffold.add(frame);
    }
    for (const [px, pz] of [[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]]) {
      scaffold.add(new THREE.Line(
        track(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(px, 0, pz), new THREE.Vector3(px, sH, pz),
        ])), lineMat(GRAY, 0.5)
      ));
    }
    const halfBuilt = wireBox(2.2, 4, 2.2, RED, 0.8);
    halfBuilt.position.y = 2;
    scaffold.add(halfBuilt);
    scaffold.position.set(8, 0, -6);
    scene.add(scaffold);

    // ============ VEHICLE FACTORY ============
    // All vehicles built facing +X. We put them inside a wrapper group and
    // rotate the wrapper toward the direction of travel — this fixes the
    // "sliding sideways" problem.

    const makeWheels = (parent, xs, y, r, halfWidth) => {
      const geo = track(new THREE.CylinderGeometry(r, r, 0.2, 10));
      const list = [];
      for (const wx of xs) for (const wz of [-halfWidth, halfWidth]) {
        const wheel = new THREE.LineSegments(
          track(new THREE.EdgesGeometry(geo)), lineMat(GRAY, 0.7)
        );
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(wx, y, wz);
        parent.add(wheel);
        list.push(wheel);
      }
      return list;
    };

    const allWheels = [];

    // --- Cement mixer ---
    const mixer = new THREE.Group();
    const mixBody = wireBox(2.6, 0.9, 1.2, GRAY, 0.8);
    mixBody.position.y = 0.75; mixer.add(mixBody);
    const mixCab = wireBox(0.9, 0.9, 1.2, RED, 0.9);
    mixCab.position.set(1.6, 0.85, 0); mixer.add(mixCab);
    const drum = wireCyl(0.55, 0.75, 1.6, 8, YELLOW, 0.9);
    drum.rotation.z = Math.PI / 2 + 0.25;
    drum.position.set(-0.5, 1.5, 0); mixer.add(drum);
    allWheels.push(...makeWheels(mixer, [-1, 0.2, 1.4], 0.3, 0.3, 0.65));

    // --- Dump truck (like your image) ---
    const dump = new THREE.Group();
    const dumpCab = wireBox(1, 1.2, 1.3, YELLOW, 0.9);
    dumpCab.position.set(1.5, 0.95, 0); dump.add(dumpCab);
    const bed = wireBox(2.4, 1, 1.4, AMBER, 0.9); // tipper bed
    bed.position.set(-0.4, 1.15, 0);
    bed.rotation.z = 0.06; // slightly raised look
    dump.add(bed);
    const chassis = wireBox(3.4, 0.3, 1.1, GRAY, 0.7);
    chassis.position.y = 0.5; dump.add(chassis);
    allWheels.push(...makeWheels(dump, [-1.2, -0.4, 1.4], 0.32, 0.32, 0.7));

    // --- Road roller ---
    const roller = new THREE.Group();
    const rolBody = wireBox(1.6, 0.8, 1, YELLOW, 0.9);
    rolBody.position.set(-0.3, 1, 0); roller.add(rolBody);
    const rolCab = wireBox(0.8, 0.8, 0.9, GRAY, 0.7);
    rolCab.position.set(-0.5, 1.75, 0); roller.add(rolCab);
    const drumFront = wireCyl(0.45, 0.45, 1, 12, GRAY, 0.85); // big front drum
    drumFront.rotation.x = Math.PI / 2;
    drumFront.position.set(0.9, 0.45, 0);
    roller.add(drumFront);
    allWheels.push(...makeWheels(roller, [-0.9], 0.4, 0.4, 0.45));

    // --- Excavator (static, but arm digs) ---
    const excavator = new THREE.Group();
    // tracks
    const trackL = wireBox(2.2, 0.5, 0.5, GRAY, 0.8);
    trackL.position.set(0, 0.25, -0.6);
    const trackR = trackL.clone(); trackR.position.z = 0.6;
    excavator.add(trackL, trackR);
    // rotating house
    const exHouse = new THREE.Group();
    exHouse.position.y = 0.7;
    const houseBox = wireBox(1.6, 0.9, 1.3, YELLOW, 0.9);
    houseBox.position.y = 0.45; exHouse.add(houseBox);
    // boom (upper arm)
    const boomPivot = new THREE.Group();
    boomPivot.position.set(0.7, 0.7, 0);
    const boom = wireBox(2.2, 0.35, 0.3, YELLOW, 0.9);
    boom.position.x = 1.1; boomPivot.add(boom);
    // stick + bucket
    const stickPivot = new THREE.Group();
    stickPivot.position.set(2.2, 0, 0);
    const stick = wireBox(1.4, 0.25, 0.25, YELLOW, 0.9);
    stick.position.x = 0.7; stickPivot.add(stick);
    const bucket = wireBox(0.5, 0.4, 0.45, GRAY, 0.9);
    bucket.position.set(1.5, -0.15, 0); stickPivot.add(bucket);
    boomPivot.add(stickPivot);
    exHouse.add(boomPivot);
    excavator.add(exHouse);
    excavator.position.set(-9, 0, 2);
    excavator.rotation.y = 0.7;
    scene.add(excavator);

    // --- Wrap moving vehicles: wrapper faces travel direction ---
    // Street runs along Z. Vehicles face +X by construction, so:
    // rotation.y = -PI/2 → nose points toward -Z (moving away)
    // rotation.y = +PI/2 → nose points toward +Z (moving toward camera)
    const movers = [
      { obj: mixer,  lane: -1.8, z: 28,  dir: -1, speed: 4.5 },
      { obj: dump,   lane:  1.8, z: -40, dir:  1, speed: 5.5 },
      { obj: roller, lane: -1.8, z: -10, dir: -1, speed: 1.2 }, // slow roller
    ];
    for (const m of movers) {
      m.obj.rotation.y = m.dir === -1 ? -Math.PI / 2 : Math.PI / 2;
      m.obj.position.set(m.lane, 0, m.z);
      scene.add(m.obj);
    }

    // ============ CONSTRUCTION SIGNS & BARRIERS ============
    // striped barrier boards along the street
    const stripeGeo = track(new THREE.PlaneGeometry(1.8, 0.35));
    const makeBarrier = (x, z, rot = 0) => {
      const g = new THREE.Group();
      const board = new THREE.LineSegments(
        track(new THREE.EdgesGeometry(stripeGeo)), lineMat(0xffffff, 0.8)
      );
      board.position.y = 0.75;
      g.add(board);
      // diagonal red stripes
      const stripePts = [];
      for (let s = -0.7; s <= 0.7; s += 0.35) {
        stripePts.push(
          new THREE.Vector3(s, 0.58, 0),
          new THREE.Vector3(s + 0.22, 0.92, 0)
        );
      }
      g.add(new THREE.LineSegments(
        track(new THREE.BufferGeometry().setFromPoints(stripePts)),
        lineMat(RED, 0.95)
      ));
      // legs
      for (const lx of [-0.7, 0.7]) {
        g.add(new THREE.Line(
          track(new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(lx, 0, 0), new THREE.Vector3(lx, 0.6, 0),
          ])), lineMat(0xffffff, 0.7)
        ));
      }
      g.position.set(x, 0, z);
      g.rotation.y = rot;
      scene.add(g);
    };
    makeBarrier(-4.2, 6, 0.3);
    makeBarrier(4.2, 2, -0.3);
    makeBarrier(-4.2, -16, 0.2);

    // warning sign: triangle on a pole with blinking lamp
    const sign = new THREE.Group();
    sign.add(new THREE.Line(
      track(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.6, 0),
      ])), lineMat(GRAY, 0.8)
    ));
    const triPts = [
      new THREE.Vector3(-0.5, 1.6, 0), new THREE.Vector3(0.5, 1.6, 0),
      new THREE.Vector3(0.5, 1.6, 0),  new THREE.Vector3(0, 2.4, 0),
      new THREE.Vector3(0, 2.4, 0),    new THREE.Vector3(-0.5, 1.6, 0),
    ];
    sign.add(new THREE.LineSegments(
      track(new THREE.BufferGeometry().setFromPoints(triPts)), lineMat(YELLOW, 1)
    ));
    // "!" mark
    sign.add(new THREE.Line(
      track(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 2.15, 0), new THREE.Vector3(0, 1.85, 0),
      ])), lineMat(YELLOW, 1)
    ));
    const blinkGeo = track(new THREE.SphereGeometry(0.14, 8, 8));
    const signLampMat = solidMat(AMBER, 1);
    const signLamp = new THREE.Mesh(blinkGeo, signLampMat);
    signLamp.position.y = 2.6;
    sign.add(signLamp);
    sign.position.set(4.5, 0, 8);
    scene.add(sign);

    // crane + tallest-building warning lights
    const craneLightMat = solidMat(RED, 1);
    const craneLight = new THREE.Mesh(blinkGeo, craneLightMat);
    craneLight.position.set(12, mastH + 2.4, -9);
    scene.add(craneLight);

    const blinkMats = [craneLightMat, signLampMat];
    const tallest = [...buildings]
      .sort((a, b) => b.userData.targetH - a.userData.targetH).slice(0, 3);
    for (const b of tallest) {
      const m = solidMat(RED, 1);
      const l = new THREE.Mesh(blinkGeo, m);
      l.position.set(b.position.x, b.userData.targetH + 0.4, b.position.z);
      l.visible = false;
      b.userData.topLight = l;
      scene.add(l);
      blinkMats.push(m);
    }

    // ============ WORKERS ============
    const workers = [];
    const headGeo = track(new THREE.SphereGeometry(0.16, 8, 8));
    const helmetGeo = track(new THREE.SphereGeometry(0.19, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2));
    const bodyGeo = track(new THREE.CylinderGeometry(0.12, 0.18, 0.6, 6));
    for (const [wx, wz] of [[6.5,-3.5],[9.5,-4],[-7.5,3],[-6,-5],[12.5,-11]]) {
      const worker = new THREE.Group();
      const body = new THREE.LineSegments(
        track(new THREE.EdgesGeometry(bodyGeo)), lineMat(GRAY, 0.8)
      );
      body.position.y = 0.3; worker.add(body);
      const head = new THREE.Mesh(headGeo, solidMat(0x94a3b8, 0.9));
      head.position.y = 0.75; worker.add(head);
      const helmet = new THREE.Mesh(helmetGeo, solidMat(YELLOW, 1));
      helmet.position.y = 0.78; worker.add(helmet);
      worker.position.set(wx, 0, wz);
      worker.userData = { phase: Math.random() * Math.PI * 2 };
      scene.add(worker);
      workers.push(worker);
    }

    // ============ DUST ============
    const pGeo = track(new THREE.BufferGeometry());
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      positions[i*3] = (Math.random()-0.5)*60;
      positions[i*3+1] = Math.random()*15;
      positions[i*3+2] = -Math.random()*40+10;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(pGeo, track(new THREE.PointsMaterial({
      color: 0x94a3b8, size: 0.08, transparent: true, opacity: 0.6,
    })));
    scene.add(particles);

    // ============ MOUSE / RESIZE ============
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ============ ANIMATION LOOP ============
    const clock = new THREE.Clock();
    let frameId;
    let prev = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = Math.min(t - prev, 0.05); // delta time, capped
      prev = t;

      // buildings grow
      for (const b of buildings) {
        const { targetH, delay, speed, topLight } = b.userData;
        if (t > delay && b.scale.y < 1) {
          b.scale.y = Math.min(1, b.scale.y + speed * dt * 0.7);
        }
        if (topLight && b.scale.y >= 1) topLight.visible = true;
      }

      // crane rotates; load lifts; cable follows
      craneTop.rotation.y = Math.sin(t * 0.15) * 1.2;
      const loadY = -6 + Math.sin(t * 0.4) * 3;
      load.position.y = loadY;
      load.rotation.y = t * 0.3;
      cable.geometry.setFromPoints([
        new THREE.Vector3(10, 0, 0), new THREE.Vector3(10, loadY + 0.25, 0),
      ]);

      // vehicles drive (dt-based, correct facing)
      for (const m of movers) {
        m.obj.position.z += m.dir * m.speed * dt;
        if (m.dir === -1 && m.obj.position.z < -45) m.obj.position.z = 30;
        if (m.dir === 1 && m.obj.position.z > 30) m.obj.position.z = -45;
      }
      drum.rotation.x = t * 2;               // mixer drum spins
      for (const w of allWheels) w.rotation.y = t * 4;

      // excavator digs: house swings, boom + stick articulate
      exHouse.rotation.y = Math.sin(t * 0.35) * 0.7;
      boomPivot.rotation.z = 0.35 + Math.sin(t * 0.8) * 0.25;
      stickPivot.rotation.z = -0.9 + Math.sin(t * 0.8 + 1.2) * 0.45;

      // workers bob
      for (const w of workers) {
        w.position.y = Math.abs(Math.sin(t * 2 + w.userData.phase)) * 0.08;
        w.rotation.y = Math.sin(t * 0.5 + w.userData.phase) * 0.6;
      }

      // blinking lights
      const blink = Math.sin(t * 3) > 0 ? 1 : 0.15;
      for (const m of blinkMats) m.opacity = blink;

      particles.rotation.y = t * 0.015;

      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.03;
      camera.position.y += (6 + mouse.y * -1.5 - camera.position.y) * 0.03;
      camera.position.z = 24 + Math.sin(t * 0.1) * 1.5;
      camera.lookAt(2, 5, -6);

      renderer.render(scene, camera);
    };
    animate();

    // ============ CLEANUP ============
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      for (const d of disposables) d.dispose?.();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
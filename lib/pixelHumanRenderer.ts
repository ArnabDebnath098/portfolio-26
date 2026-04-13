import type { HumanSprite } from "./pixelHuman";

/* ═══════════════════════════════════════════════════════
   Pixel human renderer
   Grid: 18 × 28 logical pixels, scaled 2× → 36 × 56 display
═══════════════════════════════════════════════════════ */

export const GRID_W = 18;
export const GRID_H = 28;
export const PIXEL = 2;
export const SPRITE_W = GRID_W * PIXEL; // 36
export const SPRITE_H = GRID_H * PIXEL; // 56

function px(
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  w = 1,
  h = 1,
) {
  ctx.fillStyle = color;
  ctx.fillRect(x * PIXEL, y * PIXEL, w * PIXEL, h * PIXEL);
}

export function drawHuman(
  ctx: CanvasRenderingContext2D,
  sprite: HumanSprite,
  frame: number,
  facingLeft: boolean,
  canvasW: number,
  canvasH: number,
) {
  ctx.clearRect(0, 0, canvasW, canvasH);

  const offsetX = Math.floor((canvasW - SPRITE_W) / 2);
  const offsetY = canvasH - SPRITE_H;

  ctx.save();
  if (facingLeft) {
    ctx.translate(canvasW - offsetX, offsetY);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(offsetX, offsetY);
  }

  const isPass = frame === 1 || frame === 3;
  const bob = isPass ? -1 : 0;

  // ── Shadow ──
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(3 * PIXEL, 27 * PIXEL + PIXEL / 2, 12 * PIXEL, PIXEL / 2);

  // ── Legs + feet (don't bob) ──
  drawLegs(ctx, sprite, frame);
  drawFeet(ctx, sprite, frame);

  // ── Body (bobs on pass frames) ──
  ctx.save();
  ctx.translate(0, bob * PIXEL);

  drawTorso(ctx, sprite);
  drawArms(ctx, sprite, frame);
  drawHead(ctx, sprite);
  drawHair(ctx, sprite);

  if (sprite.hasGlasses) drawGlasses(ctx);
  if (sprite.hasScarf) drawScarf(ctx, sprite);

  ctx.restore();
  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   HEAD — rows 2–8, cols 6–11 (6×7 face)
═══════════════════════════════════════════════════════ */

function drawHead(ctx: CanvasRenderingContext2D, s: HumanSprite) {
  // base skin box
  for (let y = 2; y <= 8; y++) {
    for (let x = 6; x <= 11; x++) {
      px(ctx, s.skin, x, y);
    }
  }
  // chin shading (row 8 bottom)
  px(ctx, s.skinShadow, 6, 8);
  px(ctx, s.skinShadow, 11, 8);

  // BACK ear only (col 5) — default pose faces right, ear is on the far side
  px(ctx, s.skinShadow, 5, 5);
  px(ctx, s.skin, 5, 6);
  px(ctx, s.skinShadow, 5, 7);

  // NOSE protrusion jutting out front (col 12, default = facing right)
  px(ctx, s.skin, 12, 6);
  px(ctx, s.skinShadow, 12, 7);

  // eye whites — shifted slightly toward front of face
  px(ctx, "#ffffff", 8, 5);
  px(ctx, "#ffffff", 10, 5);
  // pupils — looking forward (right)
  px(ctx, s.eye, 8, 5);
  px(ctx, s.eye, 11, 5);

  // brow above front eye
  px(ctx, s.hair, 10, 4);
  px(ctx, s.hair, 11, 4);

  // mouth — pushed to the front side
  px(ctx, s.skinShadow, 9, 7);
  px(ctx, s.skinShadow, 10, 7);

  // earring on the visible back ear
  if (s.hasEarring) {
    px(ctx, "#ffd700", 5, 8);
  }
}

/* ═══════════════════════════════════════════════════════
   HAIR — rows 0–4, with style variants
═══════════════════════════════════════════════════════ */

function drawHair(ctx: CanvasRenderingContext2D, s: HumanSprite) {
  if (s.hairStyle === "bald") return;

  if (s.hairStyle === "cap") {
    // crown
    for (let y = 0; y <= 1; y++) {
      for (let x = 5; x <= 12; x++) {
        px(ctx, s.hair, x, y);
      }
    }
    px(ctx, s.hair, 6, 2);
    px(ctx, s.hair, 7, 2);
    px(ctx, s.hair, 8, 2);
    px(ctx, s.hair, 9, 2);
    px(ctx, s.hair, 10, 2);
    px(ctx, s.hair, 11, 2);
    // brim sticking forward
    px(ctx, s.hair, 4, 3);
    px(ctx, s.hair, 5, 3);
    // highlight
    px(ctx, "#ffffff20", 7, 0);
    px(ctx, "#ffffff20", 8, 0);
    return;
  }

  // common crown
  for (let x = 5; x <= 12; x++) {
    px(ctx, s.hair, x, 0);
    px(ctx, s.hair, x, 1);
  }
  // hairline row 2
  px(ctx, s.hair, 5, 2);
  px(ctx, s.hair, 6, 2);
  px(ctx, s.hair, 11, 2);
  px(ctx, s.hair, 12, 2);
  // side puffs
  px(ctx, s.hair, 4, 1);
  px(ctx, s.hair, 13, 1);

  if (s.hairStyle === "short") {
    px(ctx, s.hair, 5, 3);
    px(ctx, s.hair, 12, 3);
    // bang over forehead
    px(ctx, s.hair, 7, 2);
    px(ctx, s.hair, 10, 2);
  } else if (s.hairStyle === "messy") {
    px(ctx, s.hair, 4, 0);
    px(ctx, s.hair, 13, 0);
    px(ctx, s.hair, 6, -1 < 0 ? 0 : 0);
    px(ctx, s.hair, 9, 0);
    px(ctx, s.hair, 5, 3);
    px(ctx, s.hair, 12, 3);
    px(ctx, s.hair, 7, 2);
    px(ctx, s.hair, 9, 2);
    // stray bits
    px(ctx, s.hair, 3, 1);
    px(ctx, s.hair, 14, 1);
  } else if (s.hairStyle === "long") {
    // sides running past face
    for (let y = 2; y <= 9; y++) {
      px(ctx, s.hair, 4, y);
      px(ctx, s.hair, 13, y);
    }
    px(ctx, s.hair, 5, 3);
    px(ctx, s.hair, 12, 3);
    // hair on shoulders
    px(ctx, s.hair, 3, 9);
    px(ctx, s.hair, 14, 9);
  } else if (s.hairStyle === "bun") {
    // bun on top
    px(ctx, s.hair, 7, 0 - 1 < 0 ? 0 : 0);
    px(ctx, s.hair, 8, 0);
    px(ctx, s.hair, 9, 0);
    px(ctx, s.hair, 10, 0);
    // bun body — can't go above row 0, so stack inside top rows
    px(ctx, s.hair, 8, 0);
    px(ctx, s.hair, 9, 0);
    px(ctx, s.hair, 5, 3);
    px(ctx, s.hair, 12, 3);
    // small tuft at front
    px(ctx, s.hair, 7, 2);
  }
}

/* ═══════════════════════════════════════════════════════
   TORSO — rows 10–17, cols 5–12 (8 wide, 8 tall)
═══════════════════════════════════════════════════════ */

function drawTorso(ctx: CanvasRenderingContext2D, s: HumanSprite) {
  // neck
  px(ctx, s.skinShadow, 8, 9);
  px(ctx, s.skinShadow, 9, 9);

  // torso
  for (let y = 10; y <= 17; y++) {
    for (let x = 5; x <= 12; x++) {
      px(ctx, s.shirt, x, y);
    }
  }

  // shoulder highlights
  px(ctx, s.shirtDark, 5, 10);
  px(ctx, s.shirtDark, 12, 10);
  // left-side shadow
  px(ctx, s.shirtDark, 5, 11);
  px(ctx, s.shirtDark, 5, 17);
  px(ctx, s.shirtDark, 12, 17);

  if (s.shirtStyle === "stripes") {
    for (let x = 5; x <= 12; x++) {
      px(ctx, s.shirtDark, x, 12);
      px(ctx, s.shirtDark, x, 14);
      px(ctx, s.shirtDark, x, 16);
    }
  } else if (s.shirtStyle === "buttoned") {
    for (let y = 10; y <= 17; y++) {
      px(ctx, s.shirtDark, 8, y);
    }
    px(ctx, "#ffffff", 8, 12);
    px(ctx, "#ffffff", 8, 14);
    px(ctx, "#ffffff", 8, 16);
    // collar
    px(ctx, s.shirtDark, 7, 10);
    px(ctx, s.shirtDark, 9, 10);
  } else if (s.shirtStyle === "hoodie") {
    // hood collar
    px(ctx, s.shirtDark, 6, 10);
    px(ctx, s.shirtDark, 7, 10);
    px(ctx, s.shirtDark, 8, 10);
    px(ctx, s.shirtDark, 9, 10);
    px(ctx, s.shirtDark, 10, 10);
    px(ctx, s.shirtDark, 11, 10);
    // kangaroo pocket
    for (let x = 6; x <= 11; x++) {
      px(ctx, s.shirtDark, x, 15);
    }
    px(ctx, s.shirt, 8, 15);
    px(ctx, s.shirt, 9, 15);
  }
}

/* ═══════════════════════════════════════════════════════
   ARMS — cols 4 & 13, rows 10–17
═══════════════════════════════════════════════════════ */

function drawArms(ctx: CanvasRenderingContext2D, s: HumanSprite, frame: number) {
  // Arms swing: frame 0 → left back, right forward; frame 2 → opposite.
  // Represented by hand offset on last rows.
  const leftSwing = frame === 0 ? 1 : frame === 2 ? -1 : 0;
  const rightSwing = frame === 0 ? -1 : frame === 2 ? 1 : 0;

  // LEFT ARM shoulder → wrist
  for (let y = 10; y <= 15; y++) {
    px(ctx, s.shirt, 4, y);
  }
  px(ctx, s.shirtDark, 4, 10);
  px(ctx, s.shirtDark, 4, 15);
  // hand
  px(ctx, s.skin, 4, 16 + leftSwing);
  px(ctx, s.skinShadow, 4, 17 + leftSwing);

  // RIGHT ARM
  for (let y = 10; y <= 15; y++) {
    px(ctx, s.shirt, 13, y);
  }
  px(ctx, s.shirtDark, 13, 10);
  px(ctx, s.shirtDark, 13, 15);
  px(ctx, s.skin, 13, 16 + rightSwing);
  px(ctx, s.skinShadow, 13, 17 + rightSwing);
}

/* ═══════════════════════════════════════════════════════
   LEGS — rows 18–23, cols 6–11 (3 px per leg)
═══════════════════════════════════════════════════════ */

function drawLegs(ctx: CanvasRenderingContext2D, s: HumanSprite, frame: number) {
  const isShorts = s.pantsStyle === "shorts";
  const pantsEnd = isShorts ? 20 : 23;

  // Belt highlight row
  for (let x = 5; x <= 12; x++) {
    px(ctx, s.pantsDark, x, 17);
  }

  // Left leg
  for (let y = 18; y <= pantsEnd; y++) {
    px(ctx, s.pants, 6, y);
    px(ctx, s.pants, 7, y);
    px(ctx, s.pants, 8, y);
  }
  px(ctx, s.pantsDark, 6, 18);
  px(ctx, s.pantsDark, 6, pantsEnd);

  // Right leg
  for (let y = 18; y <= pantsEnd; y++) {
    px(ctx, s.pants, 9, y);
    px(ctx, s.pants, 10, y);
    px(ctx, s.pants, 11, y);
  }
  px(ctx, s.pantsDark, 11, 18);
  px(ctx, s.pantsDark, 11, pantsEnd);

  // center gap to read as two legs
  px(ctx, "rgba(0,0,0,0.15)", 8, 19);
  px(ctx, "rgba(0,0,0,0.15)", 9, 19);
  px(ctx, "rgba(0,0,0,0.15)", 8, 21);
  px(ctx, "rgba(0,0,0,0.15)", 9, 21);

  // Shorts reveal skin
  if (isShorts) {
    for (let y = 21; y <= 23; y++) {
      for (let x = 6; x <= 11; x++) {
        px(ctx, s.skin, x, y);
      }
    }
    // knee shadows
    px(ctx, s.skinShadow, 6, 21);
    px(ctx, s.skinShadow, 11, 21);
  }
}

/* ═══════════════════════════════════════════════════════
   FEET — rows 24–26
═══════════════════════════════════════════════════════ */

function drawFeet(ctx: CanvasRenderingContext2D, s: HumanSprite, frame: number) {
  // walk-cycle lift: frame 0 lifts LEFT foot, frame 2 lifts RIGHT foot
  const leftLift = frame === 0 ? -1 : 0;
  const rightLift = frame === 2 ? -1 : 0;
  // forward shuffle
  const leftShiftX = frame === 0 ? -1 : frame === 2 ? 0 : 0;
  const rightShiftX = frame === 2 ? 1 : frame === 0 ? 0 : 0;

  // LEFT foot (cols 5–8)
  px(ctx, s.shoes, 5 + leftShiftX, 25 + leftLift);
  px(ctx, s.shoes, 6 + leftShiftX, 25 + leftLift);
  px(ctx, s.shoes, 7 + leftShiftX, 25 + leftLift);
  px(ctx, s.shoes, 8 + leftShiftX, 25 + leftLift);
  px(ctx, s.shoes, 4 + leftShiftX, 26 + leftLift);
  px(ctx, s.shoes, 5 + leftShiftX, 26 + leftLift);
  px(ctx, s.shoes, 6 + leftShiftX, 26 + leftLift);
  px(ctx, s.shoes, 7 + leftShiftX, 26 + leftLift);
  px(ctx, s.shoes, 8 + leftShiftX, 26 + leftLift);

  // RIGHT foot (cols 9–12)
  px(ctx, s.shoes, 9 + rightShiftX, 25 + rightLift);
  px(ctx, s.shoes, 10 + rightShiftX, 25 + rightLift);
  px(ctx, s.shoes, 11 + rightShiftX, 25 + rightLift);
  px(ctx, s.shoes, 12 + rightShiftX, 25 + rightLift);
  px(ctx, s.shoes, 9 + rightShiftX, 26 + rightLift);
  px(ctx, s.shoes, 10 + rightShiftX, 26 + rightLift);
  px(ctx, s.shoes, 11 + rightShiftX, 26 + rightLift);
  px(ctx, s.shoes, 12 + rightShiftX, 26 + rightLift);
  px(ctx, s.shoes, 13 + rightShiftX, 26 + rightLift);
}

/* ═══════════════════════════════════════════════════════
   ACCESSORIES
═══════════════════════════════════════════════════════ */

function drawGlasses(ctx: CanvasRenderingContext2D) {
  const c = "#1a1a1a";
  // frame outline around eyes at row 5
  px(ctx, c, 6, 5);
  px(ctx, c, 8, 5);
  px(ctx, c, 9, 5);
  px(ctx, c, 11, 5);
  // bridge
  px(ctx, c, 8, 5);
  // lens tint
  px(ctx, "#c0d8ff80", 7, 5);
  px(ctx, "#c0d8ff80", 10, 5);
}

function drawScarf(ctx: CanvasRenderingContext2D, s: HumanSprite) {
  for (let x = 6; x <= 11; x++) {
    px(ctx, s.scarfColor, x, 9);
  }
  px(ctx, s.scarfColor, 5, 10);
  px(ctx, s.scarfColor, 12, 10);
  // scarf tail
  px(ctx, s.scarfColor, 6, 11);
  px(ctx, s.scarfColor, 6, 12);
}

export const getDistance = (x1, x2, y1, y2) => {
  const disX = x2 - x1;
  const disY = y2 - y1;
  return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
};
export function intersect(aa, bb) {
  // tests whether lines aa and bb intersect.
  // if they intersect, it returns p and q so that
  // p5.Vector.lerp(aa[0], aa[1], p), and
  // p5.Vector.lerp(bb[0], bb[1], q) is the intersection point.
  const a0 = aa[0];
  const a1 = aa[1];
  const b0 = bb[0];
  const b1 = bb[1];

  const sa = a1.copy().sub(a0);
  const sb = b1.copy().sub(b0);
  const u = cross(sa, sb);

  // this is just a safe-guard so we do not divide by zero below.
  // it is not a good way to test for parallel lines
  if (Math.abs(u) <= 0) {
    return { intersect: false, p: null, q: null };
  }

  const ba = a0.copy().sub(b0);
  const q = cross(sa, ba) / u;
  const p = cross(sb, ba) / u;

  return { intersect: p >= 0 && p <= 1 && q >= 0 && q <= 1, p, q };
}

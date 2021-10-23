interface Circle {
  radius: number;
  x: number;
  y: number;
}

const childRadii = [1, 3, 2, 5, 1, 2];

function findPlace(i: number, bigRadius: number, allRadii: number[]): number {
  if (i < 1) {
    return 0;
  } else {
    console.log(
      allRadii[i],
      allRadii[i - 1],
      bigRadius,
      (2 * bigRadius) / (allRadii[i] + allRadii[i - 1]),
      Math.asin((2 * bigRadius) / (allRadii[i] + allRadii[i - 1])), //NaN
      Math.asin(i), //NaN
      i - 1
    );
  }
  return (
    findPlace(i - 1, bigRadius, allRadii) +
    Math.asin((2 * bigRadius) / (allRadii[i] + allRadii[i - 1]))
  );
}

function positionCirclesOnCircle(): Circle[] {
  const bigRadius = 300;
  return childRadii.map((child, i) => {
    const xPos = bigRadius * Math.cos(findPlace(i, bigRadius, childRadii));
    const yPos = bigRadius * Math.sin(findPlace(i, bigRadius, childRadii));
    return {
      radius: child,
      x: xPos,
      y: yPos,
    };
  });
}
const arrangedCirlces = positionCirclesOnCircle();

export default Circle;

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const createIdentityMatrix = () => {
  'worklet';
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};

export const reuseTranslate3dCommand = (
  matrixCommand: number[],
  x: number,
  y: number,
  z: number,
) => {
  'worklet';
  matrixCommand[12] = x;
  matrixCommand[13] = y;
  matrixCommand[14] = z;
};

export const multiplyInto = (out: number[], a: any[], b: any[]) => {
  'worklet';
  const a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3],
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7],
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11],
    a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

  let b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
};

export const reuseRotateYCommand = (
  matrixCommand: number[],
  amount: number,
) => {
  'worklet';
  matrixCommand[0] = Math.cos(amount);
  matrixCommand[2] = -Math.sin(amount);
  matrixCommand[8] = Math.sin(amount);
  matrixCommand[10] = Math.cos(amount);
};

export const reuseRotateXCommand = (
  matrixCommand: number[],
  amount: number,
) => {
  'worklet';
  matrixCommand[5] = Math.cos(amount);
  matrixCommand[6] = Math.sin(amount);
  matrixCommand[9] = -Math.sin(amount);
  matrixCommand[10] = Math.cos(amount);
};

// http://www.w3.org/TR/css3-transforms/#recomposing-to-a-2d-matrix
export const reuseRotateZCommand = (
  matrixCommand: number[],
  amount: number,
) => {
  'worklet';
  matrixCommand[0] = Math.cos(amount);
  matrixCommand[1] = Math.sin(amount);
  matrixCommand[4] = -Math.sin(amount);
  matrixCommand[5] = Math.cos(amount);
};

export const rotateXY = (amountX: number, amountY: number) => {
  'worklet';

  let rotX = createIdentityMatrix();
  reuseRotateXCommand(rotX, amountX);

  let rotY = createIdentityMatrix();
  reuseRotateYCommand(rotY, amountY);

  let result = createIdentityMatrix();
  multiplyInto(result, rotX, rotY);

  return result;
};

export const rotateXYZ = (
  amountX: number,
  amountY: number,
  amountZ: number,
) => {
  'worklet';

  let rotX = createIdentityMatrix();
  reuseRotateXCommand(rotX, amountX);

  let rotY = createIdentityMatrix();
  reuseRotateYCommand(rotY, amountY);

  let rotZ = createIdentityMatrix();
  reuseRotateZCommand(rotZ, amountZ);

  // rotXYZ = Z * Y * X
  // matrices are multiplied from right to left
  let result = createIdentityMatrix();
  // result = Y * X
  multiplyInto(result, rotX, rotY);
  // result = Z * (Y * X)
  multiplyInto(result, result, rotZ);

  return result;
};

/* this function is directly modifying the transformMatrix */
export const transformWithOrigin = (
  transformMatrix: Array<number>,
  origin: Point3D,
) => {
  'worklet';
  const {x, y, z} = origin;
  const translateToOrigin = createIdentityMatrix();
  reuseTranslate3dCommand(translateToOrigin, -x, -y, -z);
  multiplyInto(transformMatrix, translateToOrigin, transformMatrix);
  const translateBack = createIdentityMatrix();
  reuseTranslate3dCommand(translateBack, x, y, z);
  multiplyInto(transformMatrix, transformMatrix, translateBack);
};
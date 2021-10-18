export function randomElements(arr: any[], count: number) {
  let len = arr.length;
  let lookup = {};
  let tmp = [];

  if (count > len) count = len;

  for (let i = 0; i < count; i++) {
    let index;
    do {
      index = ~~(Math.random() * len);
    } while (index in lookup);
    lookup[index] = null;
    tmp.push(arr[index]);
  }

  return tmp;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function downloadBlob(
  content: any,
  filename: string,
  contentType: string
): void {
  // Create a blob
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);

  // Create a link to download it
  const pom = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", filename);
  pom.click();
}

export const groupBy = (list: any[], key: string): Map<string, Array<any>> => {
  let map = new Map();
  list.map((val) => {
    if (!map.has(val[key])) {
      map.set(
        val[key],
        list.filter((data) => data[key] == val[key])
      );
    }
  });
  return map;
};

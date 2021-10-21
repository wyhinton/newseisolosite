export default class Tag {
  name: string;
  count: number | undefined;

  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
}

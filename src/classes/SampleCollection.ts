import SampleData from "./SampleData";

class SampleCollection {
  samples!: SampleData[];
  name!: string;

  constructor(samples: SampleData[], name: string) {
    this.samples = samples;
    this.name = name;
  }
}

export default SampleCollection;

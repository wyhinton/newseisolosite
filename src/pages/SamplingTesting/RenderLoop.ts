export default class RenderLoop {
  currentFps: number;
  isActive: boolean;
  msLastFrame: number;
  cb: (deltaTime: number, totalTime: number) => void;
  totalTime: number;
  msFpsLimit: number;
  run: () => void;

  constructor(cb, fps = 0) {
    this.currentFps = 0;
    this.isActive = false;
    this.msLastFrame = performance.now();
    this.cb = cb;
    this.totalTime = 0;

    if (fps && typeof fps === "number" && !Number.isNaN(fps)) {
      this.msFpsLimit = 1000 / fps;
      this.run = () => {
        const currentTime = performance.now();
        const msDt = currentTime - this.msLastFrame;
        this.totalTime += msDt;
        const dt = msDt / 1000;

        if (msDt >= this.msFpsLimit) {
          this.cb(dt, this.totalTime);
          this.currentFps = Math.floor(1.0 / dt);
          this.msLastFrame = currentTime;
        }

        if (this.isActive) window.requestAnimationFrame(this.run);
      };
    } else {
      this.run = () => {
        const currentTime = performance.now();
        const dt = (currentTime - this.msLastFrame) / 1000;
        this.totalTime += currentTime - this.msLastFrame;
        this.cb(dt, this.totalTime);
        this.currentFps = Math.floor(1.0 / dt);
        this.msLastFrame = currentTime;
        if (this.isActive) window.requestAnimationFrame(this.run);
      };
    }
  }

  changeCb(cb) {
    this.cb = cb;
  }

  start() {
    this.msLastFrame = performance.now();
    this.isActive = true;
    window.requestAnimationFrame(this.run);
    return this;
  }

  stop() {
    this.isActive = false;
    return this;
  }
}

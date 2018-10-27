import { html, GluonElement } from '../@gluon/gluon/gluon.js';
const decoder = new Worker('../vendor/zbar.js');

export class QRScanner extends GluonElement {
  constructor() {
    super();
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.min(window.innerWidth, 480);
    this.canvas.height = Math.min(window.innerHeight, 720);

    decoder.onmessage = message => {
      if (message.data[0] !== undefined) {
        const code = message.data[0][0];
        const content = message.data[0][2];
        const event = new CustomEvent('code', { bubbles: true, detail: { code, content } });
        this.dispatchEvent(event);
      }
    };
  }

  start() {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment', width: this.canvas.width, height: this.canvas.height }, audio: false })
      .then(stream => {
        this.videoStream = stream;
        this.$.video.srcObject = stream;
        this.interval = setInterval(() => {
          const context = this.canvas.getContext('2d');
          context.drawImage(this.$.video, 0, 0, this.canvas.width, this.canvas.height);
          const imgData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
          decoder.postMessage(imgData);
        }, 100);
      });
  }

  stop() {
    this.videoStream.getTracks()[0].stop();
    this.videoStream = null;
    clearInterval(this.interval);
  }

  get template() {
    return html`<video id="video" autoplay playsinline></video>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.start();
  }

  disconnectedCallback() {
    this.stop();
  }

  // set canvas(canvas) {
  //   this._canvas = canvas;
  //   const imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
  //   decoder.postMessage(imgData);
  // }

  // get canvas() {
  //   return this._canvas;
  // }
}

customElements.define(QRScanner.is, QRScanner);

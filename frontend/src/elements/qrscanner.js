import { html, GluonElement } from '../node_modules/@gluon/gluon/gluon.js';
const decoder = new Worker('../vendor/zbar.js');

export class QRScanner extends GluonElement {
  constructor() {
    super();
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.min(window.innerWidth, 480);
    this.canvas.height = Math.min(window.innerHeight, 720);
    this.lastScan = Date.now();

    decoder.onmessage = message => {
      const currentTime = Date.now();
      if (message.data[0] !== undefined && this.lastScan < currentTime - 1000) {
        this.lastScan = currentTime;
        const code = message.data[0][0];
        const content = message.data[0][2];
        const event = new CustomEvent('code', { bubbles: true, detail: { code, content } });
        this.dispatchEvent(event);
      }
    };
  }

  start() {
    this.lastScan = Date.now();
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
      })
      .catch(e => {
        alert(e);
      });
  }

  stop() {
    if (this.videoStream) {
      this.videoStream.getTracks()[0].stop();
      this.videoStream = null;
    }
    clearInterval(this.interval);
  }

  get template() {
    return html`
      <style>
        :host {
          display: block;
          width: 200px;
        }
      </style>
      <video id="video" autoplay playsinline></video>
    `;
  }

  disconnectedCallback() {
    this.stop();
  }
}

customElements.define(QRScanner.is, QRScanner);

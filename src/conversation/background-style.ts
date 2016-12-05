export class BackgroundStyle {

  style: any;

  constructor(private backgroundImg: String) {
    this.style = {
      'background': 'url(' + backgroundImg + ') center center / cover no-repeat fixed',
      'background-size': 'cover',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
      'position': 'absolute',
      'right': '0',
      'bottom': '0',
      'left': '0',
      'top': '0',
      'z-index': '-100'
    }
  }

  getStyle() {
    return this.style;
  }

}

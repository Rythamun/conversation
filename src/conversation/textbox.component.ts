import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ryth-textbox',
  template: `
<div class="textbox">

  <div>
    <div class="textbox-avatar" *ngIf="profile_img">
      <img [src]="profile_img">
      <div class="textbox-speaker-name pull-left" *ngIf="speaker">{{speaker}}</div>
    </div>

    <div class="textbox-text" [class.textbox-text-with-avatar]="profile_img">
      <ng-content></ng-content>
    </div>
  </div>
</div>`,
  styles: [`


div.textbox {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0px;
  height: 18vh;
  margin: 10px 10px 10px 10px;
  padding: 0px 0px 0px 0px;
  border-radius: 10px;
  border: 3px solid #263238;
  background-color: rgba(38, 50, 56, 0.8);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

div.textbox-text {
  color: white;
  margin: 0px 0px 0px 0px;
  padding: 1vh 1vw 1vh 1vw;
  height: 100%;
  overflow: auto;
  font-size: 2vmax;
}

div.textbox-text-with-avatar {
  margin-left: 15.5vh;
}

div.textbox-avatar {
  position: relative;
  top: 1vh;
  left: 1vh;
  width: 13vh;
  max-width: 13vh;
  height: 13vh;
  float: left;
  border: 3px solid #263238;
  border-radius: 10px;
  background-color: white;
}

div.textbox-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }


div.textbox-speaker-name {
  position: relative;
  top: 0.5vh;
  width: 13vh;
  max-width: 13vh;
  float: left;
  color: white;
  font-size: 1vmax;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}`
  ]
})
export class TextboxComponent implements OnInit {

  @Input() speaker: string = null;
  @Input() profile_img: string = null;

  constructor() {
  }

  ngOnInit() {
  }

}

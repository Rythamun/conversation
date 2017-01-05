import { Injectable } from '@angular/core';


@Injectable()
export class GameStateService {

  constructor() { }

  getMediaUrl(mediaRequestModel: any) {
    return mediaRequestModel.resource;
  }

  currentGameState: any = { playerName: 'test' };

}

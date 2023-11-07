import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  message(message: string, messageType: MesssageType, position : Position, delay: number){
    alertify.set('notifier', 'delay', delay)
    alertify.set('notifier', 'position', position)
    alertify[messageType](message);
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export enum MesssageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}

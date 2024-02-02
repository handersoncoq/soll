import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GroupChatComponent } from 'src/app/templates/group-chat/group-chat.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _bottomSheet: MatBottomSheet) { }

  openMobileGroupChat(): void {
    this._bottomSheet.open(GroupChatComponent, {
      panelClass: 'bottom-sheet-container'
    });
  }

  closeBottomSheet(){
    this._bottomSheet.dismiss()
  }
}

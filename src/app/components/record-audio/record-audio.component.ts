import { Component, OnInit } from '@angular/core';
import { RecordRTCService } from 'src/app/services/record-rtc.service';

@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.scss'],
  providers: [RecordRTCService]
})
export class RecordAudioComponent implements OnInit {

  constructor(public recordRTC: RecordRTCService) {

  }

  ngOnInit(): void {
  }


  startVoiceRecord() {
    this.recordRTC.toggleRecord();
  }

}

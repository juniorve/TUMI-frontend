import { TranslatorService } from './../../services/translator.service';
import { Component, OnInit } from '@angular/core';
import { RecordRTCService } from 'src/app/services/record-rtc.service';
@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.scss'],
  providers: [RecordRTCService]
})
export class RecordAudioComponent implements OnInit {
  audio = '../../../assets/audio/punoondaazul2017Nov23A_16-117.wav';
  constructor(public recordRTC: RecordRTCService, private translatorService: TranslatorService) {

  }

  ngOnInit(): void {
  }

  showValue(audio) {
    console.log(audio);
  }

  startVoiceRecord() {
    this.recordRTC.toggleRecord();
  }

  show() {
    this.translatorService.translateLanguage(this.recordRTC.blob).then(response => {
      console.log(response);
    });

    /*  setTimeout(() => {
       this.translatorService.getText()
         .subscribe(value => {
           console.log(value);
         });
     }, 1000); */
  }
}

// import * as os from 'os';
// import * as fs from 'fs';
// Import other Node.js modules as needed

import { Component,NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { delay } from 'rxjs';


// import * as os from 'os-utils';
declare global {
  interface Window {
    require: NodeRequire;
  }
}
// const { ipcRenderer } = window.require('electron');

// var os 	= require('os-utils');
@Component({
  selector: 'app-pc-monitor',
  templateUrl: './pc-monitor.component.html',
  styleUrls: ['./pc-monitor.component.css']
})
export default class PcMonitorComponent {
  public osObject:any;
  public cpuTemperature:any;
  private _ipc: IpcRenderer | undefined;
// constructor() {
//   os.cpuUsage((v:object) => {
//     console.log(v);
//     this.osObject = v;
//   });
// }

  constructor(private zone: NgZone) {
    // ipcRenderer.on('cpu-temperature', (event:any, data:any) => {
    //   this.zone.run(() => {
    //     this.cpuTemperature = data.main;
    //   });
    // });
    


    if (window.require) {
       try {
        delay(4000);
        this._ipc = window.require('electron').ipcRenderer;
        console.log('IPC loaded successfully');
      } catch (e) {
        console.error('Failed to load IPC:', e);
      }
    } else {
      console.error("Electron's IPC was not loaded");
    }
    // if (window.require) {
    //   try {
    //     this._ipc = window.require('electron').ipcRenderer;
    //     console.log("ipc launched in angular");
    //   } catch (e) {
    //     throw e;
    //   }
    // } else {
    //   console.warn('Electron\'s IPC was not loaded');
    // }



    this._ipc?.on('main-window-ready', () => {
      // Now it's safe to request CPU temperature data
      this._ipc?.send('request-cpu-temperature');
      console.log("request TO ELECTRON launched in angular");
    });

    this._ipc?.on('cpu-temperature', (event:any, data:any) => {
      this.zone.run(() => {
        this.cpuTemperature = data.main;
        console.log("GETTING CPU TEMPERATURE in angular");
        console.log(data);
      });
    });

  }

}

import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Camera, SecurityCamerasData } from '../data/security-cameras';

@Injectable()
export class SecurityCamerasService extends SecurityCamerasData {

  private cameras: Camera[] = [
    {
      title: 'Fibonacci',
      source: 'assets/images/poker20.PNG',
    },
    {
      title: 'Modified Fibonacci',
      source: 'assets/images/poker23.PNG',
    },
    {
      title: 'Power Of 2',
      source: 'assets/images/poker24.PNG',
    },
    {
      title: 'T-Shirt',
      source: 'assets/images/poker211.PNG',
    },
  ];

  getCamerasData(): Observable<Camera[]> {
    return observableOf(this.cameras);
  }
}

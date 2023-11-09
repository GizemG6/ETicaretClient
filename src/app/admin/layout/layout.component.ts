import { AlertifyService, MesssageType, Position } from './../../services/admin/alertify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    constructor(private alertify: AlertifyService) { }

    ngOnInit(): void {
      
    }
}

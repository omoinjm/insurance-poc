import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  standalone: true,
  imports: [CommonModule, NgbModule],
})
export class AvatarComponent implements OnInit {
  @Input() ShortCode: string = '??';
  @Input() FullName: string = '';
  //lg
  @Input() Size: string = 'md';
  @Input() UnknownTitle: string = 'Unassigned';

  @Input() Colour: string = 'red';

  @Input() AutoColour: boolean = false;

  ngOnInit() {
    //console.log(this.ShortCode);
    //console.log(this.FullName);
    if (this.FullName) {
      if (this.Colour == null) {
      }

      if (this.AutoColour == true) {
        this.Colour = this.stringToHslColor(this.FullName, 30, 65);
      }

      if (!this.ShortCode || this.ShortCode == '??') {
        this.ShortCode = this.getInitials(this.FullName);
      }
    }
  }

  stringToHslColor(str: string, s: string | number, l: string | number) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }

  getInitials(name: any) {
    //const parts = name.split(' ').filter(i => i);
    //let initials = '';
    //initials = name.shift().charAt(0) + parts.pop().charAt(0);
    //return initials;

    const parts = name.split(' ').filter((i: any) => i);
    let initials = '';
    for (var i = 0; i < parts.length && i < 2; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0];
      }
    }
    return initials;
  }
}

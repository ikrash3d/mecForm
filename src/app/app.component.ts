import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { FormValueInterface } from './interface/form-value-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mec-form';

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
}

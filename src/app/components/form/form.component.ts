import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { FormValueInterface } from 'src/app/interface/form-value-interface';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @ViewChild('formDirective') private formDirective!: NgForm;

  public group = new FormControl('', Validators.required);
  public myForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataHandler: DataHandlerService
  ) {
    this.createForm();
  }

  public getErrorMessage(): string {
    let error = '';
    if (this.group.hasError('required')) {
      error = 'Veuillez remplir ce champ';
    }
    return error;
  }
  ngOnInit(): void {}

  private createForm() {
    this.myForm = this.formBuilder.group({
      group: ['', Validators.required],
      team: ['', Validators.required],
      try: ['', Validators.required],
      distance: ['', Validators.required],
      oDep: ['', Validators.required],
      pRt: ['', Validators.required],
      oRec: ['', Validators.required],
      S: ['', Validators.required],
      tEs: ['', Validators.required],
      x: ['', Validators.required],
      y: ['', Validators.required],
      z: ['', Validators.required],
      mProt: ['', Validators.required],
      mTran: ['', Validators.required],
      e: ['', Validators.required],
      tIns: ['', Validators.required],
      penalty: ['', Validators.required],
    });
  }

  public async addInfo(): Promise<void> {
    if (this.myForm.valid) {
      const form: FormValueInterface = {
        id: uuid.v4(),
        ...this.myForm.value,
        timeStamp: new Date().getTime() / 1000,
      };
      this.dataHandler.formValue = form;
      await this.dataHandler.addData(form);
      this.formDirective.resetForm();
      this.myForm.reset();
    }
  }
}

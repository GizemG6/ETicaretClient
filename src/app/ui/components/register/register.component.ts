import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, spinner: NgxSpinnerService) {
    super(spinner)
  }

  form: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password : ["", [
        Validators.required,
      ]],
      passwordConfirm : ["", [
        Validators.required,
      ]]
    })
  }

  get component() {
    return this.form.controls;
  }

  submitted: boolean = false;
  onSubmit(data: any) {
    this.submitted = true;
    if (this.form.invalid)
      return;
  }
}

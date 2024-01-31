import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { group } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private toastrService: CustomToastrService, 
    spinner: NgxSpinnerService) {
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
    },
    {
      validators: (group: AbstractControl): ValidationErrors | null => 
      {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  get component(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;
    
    if(this.form.invalid)
      return

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
    messageType: ToastrMessageType.Success,
    position: ToastrPosition.TopRight
  })
    else
      this.toastrService.message(result.message, "Hata", {
    messageType: ToastrMessageType.Error,
    position: ToastrPosition.TopRight
  })

  }
}

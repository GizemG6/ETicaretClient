import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private formBuilder: FormBuilder) {}

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad: [""],
      kullaniciAdi: [""],
      email: [""],
      sifre: [""],
      sifreTekrar: [""]
    })
  }
}

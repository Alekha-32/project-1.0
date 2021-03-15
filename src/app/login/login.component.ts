import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  submitted = false;
  register:any={};
  constructor(private formBulider:FormBuilder) { }


  ngOnInit(): void {
    this.LoginForm = this.formBulider.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
}
get f() { return this.LoginForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.LoginForm.invalid) {
      return;
  }

  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.LoginForm.value))
  this.register = Object.assign(this.register,this.LoginForm.value);
 localStorage.setItem('register',JSON.stringify(this.register));
}


}

function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
       
        return;
    }
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
  }
}


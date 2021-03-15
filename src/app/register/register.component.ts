import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  register:any={};
  constructor(private formBulider:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBulider.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
}
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
         alert("Registration successfull");
    this.register = Object.assign(this.register,this.registerForm.value);
   localStorage.setItem('register',JSON.stringify(this.register));
   this.router.navigateByUrl('/login');
   
   
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


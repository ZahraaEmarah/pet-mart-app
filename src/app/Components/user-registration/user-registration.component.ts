import { Component, OnInit } from '@angular/core';
import { AbstractControl, EmailValidator, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { forbiddenNameValidator } from 'src/app/CustomValidators/forbiddenName.validator';
import { passwordHasNameValidator } from 'src/app/CustomValidators/passwordHasUserName.validator';
import { passwordMatchValidator } from 'src/app/CustomValidators/passwordMatch.validator';
import { uniqueEmailValidator } from 'src/app/CustomValidators/uniqueEmail.validator';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { IUser } from 'src/app/Models/IUser';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registerFormGroup: FormGroup;
  fetchedEmail: string = '';
  users: IUser[] = [];
  private subscriptionList: Subscription[] = [];

  constructor(private fb: FormBuilder, private userAuthSrv: UserAuthService, private router: Router) {
    this.registerFormGroup = fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), forbiddenNameValidator(/user/)]],
      email: ['', [Validators.required, Validators.email], uniqueEmailValidator(userAuthSrv)],
      mobileNumbers: fb.array([""]),
      address: fb.group({
        city: ['', [Validators.required]],
        zipCode: [, [Validators.required, Validators.minLength(5)]],
        street: ['', [Validators.required]],
      }),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      Anytime: [false],
      SpecificDays: ['']
    }, {
      validator: passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.AddMobileNumberValidator();
    this.registerFormGroup.addValidators([passwordHasNameValidator]);
  }

  ngOnChanges(): void {

  }

  get fullName() {
    return this.registerFormGroup.get('fullName');
  }

  get email() {
    //console.log(this.registerFormGroup.get('email')?.errors)
    return this.registerFormGroup.get('email');
  }

  get password() {
    return this.registerFormGroup.get('password');
  }

  get confirmpassword() {
    return this.registerFormGroup.get('confirmPassword');
  }

  get city() {
    return this.registerFormGroup.get('address')!.get('city');
  }
  get zipcode() {
    return this.registerFormGroup.get('address')!.get('zipCode');
  }
  get street() {
    return this.registerFormGroup.get('address')!.get('street');
  }

  get Anytime() {
    return this.registerFormGroup.get('Anytime');
  }

  get mobileNumbers() {
    const mobileNoArr: FormArray = this.registerFormGroup.get('mobileNumbers') as FormArray;
    return mobileNoArr;
  }

  mobileNumberEntry(index: number) {
    const mobileNoArr: FormArray = this.registerFormGroup.get('mobileNumbers') as FormArray;
    return this.mobileNumbers.controls[index];
  }

  getErrors() {
    console.log(this.email?.errors);
  }

  updateValidation() {
    console.log('updateValidation');
    if (this.Anytime?.value == "1") {
      this.registerFormGroup.get('SpecificDays')?.addValidators([Validators.required]);
    }
    else {
      this.registerFormGroup.get('SpecificDays')?.clearValidators();
    }
    this.registerFormGroup.get('SpecificDays')?.updateValueAndValidity()

  }

  AddMobileNumberValidator() {
    this.mobileNumbers.controls.forEach(element => {
      element.addValidators([Validators.required, Validators.pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/)]);
    });
  }

  addMobileNoInput() {
    const mobileNoArr = this.registerFormGroup.get('mobileNumbers') as FormArray;
    mobileNoArr.push(new FormControl(''));
    this.AddMobileNumberValidator();
  }

  RemoveMobileNoInput(index: number) {
    const mobileNoArr = this.registerFormGroup.get('mobileNumbers') as FormArray;
    mobileNoArr.removeAt(index);
  }

  register() {
    let userModel: IUser = this.registerFormGroup.value as IUser;
    console.log(userModel);
    this.userAuthSrv.RegisterNewUser(userModel).subscribe({
      next: (prd => {
        this.userAuthSrv.login(this.fullName?.value, this.password?.value);
        this.router.navigate(['/Home'])
      }),
      error: (err) => {
        console.log(err);
      }
    });
  }

  fillForm() {
    //In case of edit profile
    // 1- Get User ID from URL
    // 2- Call Service to get current user profile
    // 3- Use PatchValue() to fill the form with data before edit
    this.registerFormGroup.patchValue({ "fullName": "Test", "email": "test@test.com", "mobileNumber": "0111111111" }); // some of fields
    // this.registerFormGroup.setValue({"fullName": "Test", "email": "test@test.com", "mobileNumber": "0111111111"});// all form fields

  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }

}





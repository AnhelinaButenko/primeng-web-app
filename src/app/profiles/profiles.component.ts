import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProfile} from "./profiles";
import {ProfilesService} from "./profiles.service";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})

export class ProfilesComponent implements OnInit {
  user: IProfile | undefined;
  form: FormGroup | undefined = undefined;
  constructor(private profileService: ProfilesService,
              private fb: FormBuilder) { }

  genderOptions: { label: string; value: number }[] = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 }
  ];

  activityLevels: { label: string, value: number }[] = [
    { label: 'Minimal', value: 1 },
    { label: 'Low', value: 2 },
    { label: 'Moderate', value: 3 },
    { label: 'High', value: 4 },
    { label: 'Very High', value: 5 }
  ];

  selectedActivityLevel: number = 1;
  selectedGenderOption: number = 1;

  recommendedCalories: number = 0;

  calculateRecommendedCalories(): void {

  }

  onSubmit(): void {

    console.log(JSON.stringify(this.form?.value));

    const profile: IProfile = {
      id: this.form?.value.id ?? 0,
      userName: this.form?.value.userName ?? "",
      email: this.form?.value.email ?? "",
      currentWeight: this.form?.value.currentWeight ?? 0,
      desiredWeight: this.form?.value.desiredWeight ?? 0,
      height: this.form?.value.height ?? 0,
      age: this.form?.value.age ?? 0,
      gender: this.form?.value.gender ?? "",
      activityLevel: this.form?.value.activityLevel ?? "",
    }

    if (this.user) {
      this.user.activityLevel = this.selectedActivityLevel;
      this.user.gender = this.selectedGenderOption;

      this.profileService.updateProfile(this.user.id, profile).subscribe(
        (updatedProfile: IProfile) => {
          console.log('Profile updated successfully:', updatedProfile);
          this.user = updatedProfile;
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.profileService.getById(1).subscribe((profile: IProfile) => {
      this.user = profile;

            this.form = this.fb.group({
            id: [profile.id],
            userName: [profile.userName, [Validators.required, Validators.minLength(2), Validators.max(50)]],
            email: [profile.email, [Validators.email, Validators.max(150)]],
            currentWeight: [profile.currentWeight, [Validators.required, Validators.minLength(1), Validators.max(300)]],
            desiredWeight: [profile.desiredWeight, [Validators.required, Validators.minLength(1), Validators.max(300)]],
            height: [profile.height, [Validators.required, Validators.minLength(50), Validators.max(250)]],
            age: [profile.age, [Validators.required, Validators.minLength(1), Validators.max(150)]],
            gender: [profile.gender, [Validators.required]],
            activityLevel: [profile.activityLevel, [Validators.required]],
          });

          if(!this.user?.id) {
            this.form = this.fb.group({
            id: [0],
            userName: [undefined, [Validators.required, Validators.minLength(2), Validators.max(50)]],
            email: [undefined, [Validators.required, Validators.email]],
            currentWeight: [undefined, [Validators.required, Validators.minLength(1), Validators.max(300)]],
            desiredWeight: [undefined, [Validators.required, Validators.minLength(1), Validators.max(300)]],
            height: [undefined, [Validators.required, Validators.minLength(50), Validators.max(250)]],
            age: [undefined, [Validators.required, Validators.minLength(1), Validators.max(150)]],
            gender: [undefined, [Validators.required]],
            activityLevel: [undefined, [Validators.required]],
      });
    }
    });
  }
}


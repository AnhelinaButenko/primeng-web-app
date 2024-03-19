import {Component, OnInit} from '@angular/core';
import {catchError, Observable, Subscription, throwError} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {IProfile} from "./profiles";
import {ProfilesService} from "./profiles.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})

export class ProfilesComponent implements OnInit {
  user: IProfile | undefined;

  constructor(private profileService: ProfilesService) { }

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];
  activityLevelOptions = [
    { label: 'Minimal', value: 'Minimal' },
    { label: 'Low', value: 'Low' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'High', value: 'High' },
    { label: 'VeryHigh', value: 'VeryHigh' }
  ];

  // onSubmit(): void {
  //   if (this.user) {
  //     this.profileService.updateProfile(this.user.id, this.user).subscribe(
  //       (updatedProfile: IProfile) => {
  //         console.log('Profile updated successfully:', updatedProfile);
  //       }
  //     );
  //   }
  // }

  onSubmit(): void {
    if (this.user) {
      this.profileService.updateProfile(this.user.id, this.user).subscribe(
        (updatedProfile: IProfile) => {
          console.log('Profile updated successfully:', updatedProfile);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            let errorMessage = 'Validation errors occurred:';
            if (validationErrors.userDto) {
              errorMessage += `\n${validationErrors.userDto[0]}`;
            }
            if (validationErrors['$.activityLevel']) {
              errorMessage += `\n${validationErrors['$.activityLevel'][0]}`;
            }
            alert(errorMessage);
          } else {
            this.handleError(error);
          }
        }
      );
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  ngOnInit(): void {
    this.profileService.getById(1).subscribe((profile: IProfile) => {
      this.user = profile;
    });
  }
}


// export class ProfilesComponent implements OnInit, OnDestroy {

//   sub: Subscription | undefined;
//   getByIdSub: Subscription | undefined;
//   updateSub: Subscription | undefined;
//   profile:  IProfile | undefined;
//   profilesList: IProfile[] = [];
//
//   form: FormGroup| undefined = undefined;
//
//   recommendedCalories: number = 0;
//
//   constructor(private fb: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router,
//               private messageService: MessageService,
//               private profileService: ProfilesService) {
//   }
//
//   ngOnInit(): void {
//
//     // this.profileService.getProfiles().subscribe((profiles: IProfile[]) => {
//     //     this.profilesList = profiles;
//     // });
//
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//
//     if(id) {
//       this.getByIdSub = this.profileService.getById(id).subscribe({
//         next: (profile: IProfile) => {
//           this.profile = profile;
//
//           this.form = this.fb.group({
//             id: [profile.id],
//             userName: [profile.userName, [Validators.required]],
//             email: [profile.email, [Validators.required]],
//             currentWeight: [profile.currentWeight, [Validators.required]],
//             desiredWeight: [profile.desiredWeight, [Validators.required]],
//             height: [profile.height, [Validators.required]],
//             age: [profile.age, [Validators.required]],
//             gender: [profile.gender, [Validators.required]],
//             activityLevel: [profile.activityLevel, [Validators.required]],
//           });
//         }
//       });
//     }
//     else {
//       this.form = this.fb.group({
//         id: [0],
//         userName: [undefined, [Validators.required]],
//         email: [undefined, [Validators.required]],
//         currentWeight: [undefined, [Validators.required]],
//         desiredWeight: [undefined, [Validators.required]],
//         height: [undefined, [Validators.required]],
//         age: [undefined, [Validators.required]],
//         gender: [undefined, [Validators.required]],
//         activityLevel: [undefined, [Validators.required]],
//       });
//     }
//
//   }
//
//   onSubmit(): void {
//     console.log(JSON.stringify(this.form?.value));
//
//     const profile: IProfile = {
//       id: this.form?.value.id ?? 0,
//       userName: this.form?.value.userName ?? "",
//       email: this.form?.value.email ?? "",
//       currentWeight: this.form?.value.currentWeight ?? 0,
//       desiredWeight: this.form?.value.desiredWeight ?? 0,
//       height: this.form?.value.height ?? 0,
//       age: this.form?.value.age ?? 0,
//       gender: this.form?.value.gender ?? "",
//       activityLevel: this.form?.value.activityLevel ?? "",
//     }
//
//     if (this.form?.value.id) {
//       this.updateSub = this.profileService.updateProfile(this.form?.value.id, profile).subscribe({
//         next: profile => {
//           console.log(profile);
//           this.messageService.add({severity:'success', summary:'Service Message', detail:'This data is updated'});
//         }
//       })
//     }
//   }
//
//   // calculateRecommendedCalories(): void {
//   //
//   //   this.recommendedCalories =
//   // }
//
//   ngOnDestroy(): void {
//     this.sub?.unsubscribe();
//     this.getByIdSub?.unsubscribe();
//     this.updateSub?.unsubscribe();
//   }
// }

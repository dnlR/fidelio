import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ActionSheetButton } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ZipCode } from 'src/app/interfaces/zipcode';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { ZipCodesService } from 'src/app/services/zip-codes.service';
import { UsersService } from 'src/app/services/users.service';
import { UpdateUser } from 'src/app/models/update-user';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss'],
})
export class UpdateUserInfoComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  nameControl!: FormControl;
  zipcodeControl!: FormControl;
  addressControl!: FormControl;
  phoneControl!: FormControl;

  searchedZipCodeId;
  searchedZipCode;

  actionSheetPresented = false;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private auth: AuthService,
    private router: Router,
    private zipCodeService: ZipCodesService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.zipcodeControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.addressControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.phoneControl = new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern("^[0-9]*$")]);
  }

  async searchZipCode(event: any) {
    const zipCode = event.target.value;

    if (zipCode
      && zipCode.trim() !== ''
      && 3 < zipCode.length
      && event.inputType !== 'deleteContentBackward') {

      let matchingZipCodes = await this.zipCodeService.getMatchingZipCodesForZipCode(zipCode);
      if (0 < matchingZipCodes.length && !this.actionSheetPresented) {
        this.actionSheetPresented = true;
        await this.presentActionSheetForZipCodes(matchingZipCodes);
        this.actionSheetPresented = false;
      } else {
        this.zipcodeControl.setErrors({ 'nozipcode': true });
      }
    }
  }

  async presentActionSheetForZipCodes(zipCodes: ZipCode[]) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Matching Zip Codes',
      backdropDismiss: false,
      buttons: zipCodes.map(zc => <ActionSheetButton>{
        text: `${zc.zip_code}: ${zc.city}`,
        data: {
          action: 'confirm',
          zipCodeId: zc.id,
          zipCode: zc.zip_code,
        }
      })
    });

    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    this.searchedZipCodeId = result.data.zipCodeId;
    this.searchedZipCode = result.data.zipCode;
  }

  async updateUser() {
    if (this.nameControl.valid
      && this.zipcodeControl.valid
      && this.addressControl.valid
      && this.phoneControl.valid) {

      const authUser = await this.auth.getUser();
      const user: UpdateUser = {
        id: authUser.id,
        name: this.nameControl.value,
        address: this.addressControl.value,
        zipcode: this.searchedZipCodeId,
        phone: this.phoneControl.value,
      }

      console.log(`UPDATE USER: ${user.name},${user.zipcode},${user.address},${user.phone}`);

      const { data, error } = await this.userService.updateUser(user);

      if (error) {
        alert(`There was something wrong trying to update your details. Please try again.`);
      } else {
        this.router.navigate(['/user']);
      }
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActionSheetController, ActionSheetButton } from '@ionic/angular';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface ZipCode {
  id: string,
  zip_code: string,
  city: string
}
export class User {

  constructor(
    // public id: number,
    public name: string,
    // public email: string,
    public zipcode: number,
    public address: string,
    public phone: string,
    public tos_accepted: boolean
  ) { }
}


@Component({
  selector: 'app-fill-user-info',
  templateUrl: './fill-user-info.component.html',
  styleUrls: ['./fill-user-info.component.scss'],
})
export class FillUserInfoComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  formGroupName!: FormGroup;
  formGroupZipCode!: FormGroup;
  formGroupAddress!: FormGroup;
  formGroupPhone!: FormGroup;
  formGroupTOS!: FormGroup;

  searchedZipCodeId;
  searchedZipCode;

  actionSheetPresented = false;

  private supabase: SupabaseClient;

  constructor(private actionSheetCtrl: ActionSheetController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  ngOnInit() {
    this.formGroupName = new FormGroup({
      'nameControl': new FormControl('', [Validators.required])
    });
    this.formGroupZipCode = new FormGroup({
      'zipcodeControl': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.formGroupAddress = new FormGroup({
      'addressControl': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.formGroupPhone = new FormGroup({
      'phoneControl': new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern("^[0-9]*$")])
    });
    this.formGroupTOS = new FormGroup({
      'tosControl': new FormControl('', [Validators.requiredTrue])
    })
  }

  addUser() {
    if (this.formGroupName.valid
      && this.formGroupZipCode.valid
      && this.formGroupAddress.valid
      && this.formGroupPhone.valid) {

      const user: User = {
        name: this.formGroupName.get('nameControl').value,
        zipcode: this.searchedZipCodeId,
        address: this.formGroupAddress.get('addressControl').value,
        phone: this.formGroupPhone.get('phoneControl').value,
        tos_accepted: this.formGroupTOS.get('tosControl').value
      }
      console.log(user);
      // this.router.navigate(['/home']);
    }
  }

  async getItems(event: any) {
    // set zipCode to the value of the search input
    const zipCode = event.target.value;

    // if (event.inputType === 'deleteContentBackward') {
    //   console.log('delete pressed');
    // }

    if (zipCode
      && zipCode.trim() !== ''
      && 3 < zipCode.length
      && event.inputType !== 'deleteContentBackward') {

      let matchingZipCodes = await this.getMatchingZipCodesForZipCode(zipCode);
      if (0 < matchingZipCodes.length && !this.actionSheetPresented) {
        this.actionSheetPresented = true;
        await this.presentActionSheetForZipCodes(matchingZipCodes);
        this.actionSheetPresented = false;
      } else {
        this.formGroupZipCode.get('zipcodeControl').setErrors({ 'nozipcode': true });
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

  async getMatchingZipCodesForZipCode(code): Promise<ZipCode[]> {
    let { data: zip_codes, error } = await this.supabase
      .from('zip_codes')
      .select("id, zip_code, city")
      .ilike('zip_code', `%${code}%`);

    return zip_codes;
  }
}

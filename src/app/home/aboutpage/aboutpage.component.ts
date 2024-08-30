import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { routeAnimationState } from '../../../../shared/route.animation';
import { FormControl, FormGroup } from '@angular/forms';
import { About, AboutService } from '../../services/about.service';
import { NotificationAboutComponent } from './notification-about/notification-about.component';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-aboutpage',
  templateUrl: './aboutpage.component.html',
  styleUrl: './aboutpage.component.css',
  animations: [routeAnimationState],
})
export class AboutpageComponent implements OnInit {
  constructor(private _aboutService: AboutService) {}

  about: About = {
    headerImg: '',
    firstImage: '',
    secondImage: '',
    history: '',
    growth: '',
    MissionAndVisionstatement: '',
    strategy: '',
    WhyArtHouse: '',
    OurScope: '',
    OurCommitment: '',
    __v: 0,
  };
  form!: FormGroup;

  ngOnInit(): void {
    console.log('iam here');
    this._aboutService.getAboutData().subscribe((data) => {
      this._aboutService.updateAbout(data[0]);
      this.about = this._aboutService.getAllAbout();
    });

    this.form = new FormGroup({
      headerImg: new FormControl(null),
      firstImage: new FormControl(null),
      secondImage: new FormControl(null),
      history: new FormControl(this.about.history),
      growth: new FormControl(this.about.growth),
      MissionAndVisionstatement: new FormControl(
        this.about.MissionAndVisionstatement
      ),
      strategy: new FormControl(this.about.strategy),
      WhyArtHouse: new FormControl(this.about.WhyArtHouse),
      OurScope: new FormControl(this.about.OurScope),
      OurCommitment: new FormControl(this.about.OurCommitment),
    });
  }

  submit() {
    if (this.form.value.headerImg !== null) {
      console.log(this.form.value.headerImg);
      const formData = new FormData();
      formData.append('headerImg', this.form.get('headerImg')?.value);
      this._aboutService.updateHeaderImg(formData).subscribe((data) => {
        console.log(data);
      });
    }
    if (this.form.value.firstImage !== null) {
      console.log(this.form.value.firstImage);
      const formData = new FormData();
      formData.append('firstImage', this.form.get('firstImage')?.value);
      this._aboutService.updateFirstImg(formData).subscribe((data) => {
        console.log(data);
      });
    }
    if (this.form.value.secondImage !== null) {
      console.log(this.form.value.secondImage);
      const formData = new FormData();
      formData.append('secondImage', this.form.get('secondImage')?.value);
      this._aboutService.updateSecondImg(formData).subscribe((data) => {
        console.log(data);
      });
    }
    const data = {
      history:
        this.form.value.history == ''
          ? this.about.history
          : this.form.value.history,
      growth:
        this.form.value.growth == ''
          ? this.about.growth
          : this.form.value.growth,
      MissionAndVisionstatement:
        this.form.value.MissionAndVisionstatement == ''
          ? this.about.MissionAndVisionstatement
          : this.form.value.MissionAndVisionstatement,
      strategy:
        this.form.value.strategy == ''
          ? this.about.strategy
          : this.form.value.strategy,
      WhyArtHouse:
        this.form.value.WhyArtHouse == ''
          ? this.about.WhyArtHouse
          : this.form.value.WhyArtHouse,
      OurScope:
        this.form.value.OurScope == ''
          ? this.about.OurScope
          : this.form.value.OurScope,
      OurCommitment:
        this.form.value.OurCommitment == ''
          ? this.about.OurCommitment
          : this.form.value.OurCommitment,
    };
    this._aboutService.updateAboutData(data).subscribe((data) => {
      this._aboutService.updateAbout(data[0]);
      this.about = this._aboutService.getAllAbout();
    });
  }
  onHeaderChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ headerImg: file });
  }
  onFirtsFileChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ firstImage: file });
  }
  onSecondFileChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ secondImage: file });
  }
  @ViewChild('toast') toast!: NotificationAboutComponent;
  showToast() {
    this.toast.show();
  }
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
}

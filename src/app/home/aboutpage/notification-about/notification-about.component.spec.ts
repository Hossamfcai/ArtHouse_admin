import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAboutComponent } from './notification-about.component';

describe('NotificationAboutComponent', () => {
  let component: NotificationAboutComponent;
  let fixture: ComponentFixture<NotificationAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

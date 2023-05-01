import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserInfoComponent } from './edit-user-info.component';

describe('EditUserInfoComponent', () => {
  let component: EditUserInfoComponent;
  let fixture: ComponentFixture<EditUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismTableUsersComponent } from './organism-table-users.component';

describe('OrganismTableUsersComponent', () => {
  let component: OrganismTableUsersComponent;
  let fixture: ComponentFixture<OrganismTableUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismTableUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismTableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

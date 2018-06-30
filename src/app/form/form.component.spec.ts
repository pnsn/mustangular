import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import {DebugElement } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de : DebugElement;
  let el : HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports:[ BrowserModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(FormComponent);
      component = fixture.componentInstance;
      
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should be valid', async(() => {
    comp.ngForm.
  
  }));
  
  it('should submit', async(()=>{
  
  
  });
});

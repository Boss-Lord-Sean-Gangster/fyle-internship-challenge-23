import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event with username on button click', () => {
    spyOn(component.searchEvent, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    inputElement.value = 'testuser';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    buttonElement.click();

    expect(component.searchEvent.emit).toHaveBeenCalledWith('testuser');
  });

  it('should have an input element with placeholder', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Enter GitHub username Ex.mojombo');
  });

  it('should bind input value to searchUsername', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'testuser';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    ex

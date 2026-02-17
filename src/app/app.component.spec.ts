import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should expose seeded findings for preview output', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.findings.length).toBeGreaterThan(0);
  });

  it('should render separated workflow components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-top-menu')).toBeTruthy();
    expect(compiled.querySelector('app-recording-source')).toBeTruthy();
    expect(compiled.querySelector('app-reference-ad-search')).toBeTruthy();
    expect(compiled.querySelector('app-detection-results')).toBeTruthy();
    expect(compiled.textContent).toContain('Dashboard');
    expect(compiled.textContent).toContain('Settings');
    expect(compiled.textContent).toContain('Sign in');
    expect(compiled.textContent).toContain('Logout');
  });
});

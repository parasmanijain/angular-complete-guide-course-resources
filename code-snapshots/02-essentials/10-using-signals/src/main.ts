import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZonelessChangeDetection } from '@angular/core';
bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
}).catch((err: unknown) => {
  console.error('Application failed to start:', err);
});

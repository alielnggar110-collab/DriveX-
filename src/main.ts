import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => {
    console.error('Bootstrap failed:', err);
    // Prevent infinite reload loops
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <h2>Application failed to load</h2>
          <p>Please refresh the page or contact support</p>
          <details style="margin-top: 20px; text-align: left;">
            <summary>Error details</summary>
            <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${err}</pre>
          </details>
        </div>
      </div>
    `;
  });

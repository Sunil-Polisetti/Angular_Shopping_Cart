import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


// Ensure auth state does not persist across browser restarts
sessionStorage.removeItem('currentUser');
sessionStorage.removeItem('token');
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule);

// bootstrapApplication(AppComponent, {
//   providers: [{ provide: TasksServiceToken, useClass: TasksService }],
// }).catch((err) => console.error(err));
// bootstrapApplication(AppComponent).catch(
//   (err) => console.error(err)
// );

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Importa LoginComponent aquí

@NgModule({
  imports: [
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

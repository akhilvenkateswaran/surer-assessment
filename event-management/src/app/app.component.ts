 import { Component } from '@angular/core';
 import { OAuthService } from 'angular-oauth2-oidc';
 import { AuthConfig } from 'angular-oauth2-oidc';
 import { environment } from 'src/environments/environment';
 
 export const authCodeFlowConfig: AuthConfig = {
 // Url of the Identity Provider
  issuer: environment.apiURL,
  
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  
  clientId: environment.clientId,
  
  responseType: environment.responseType,
  
  scope: environment.scope,
  
  showDebugInformation: true
 };
 
 @Component({
   selector: 'ngx-app',
   template: '<router-outlet></router-outlet>',
 })
 export class AppComponent{
    title(title: any) {
      throw new Error('Method not implemented.');
    }
 
    constructor(private oAuthService: OAuthService) {
      this.oAuthService.configure(authCodeFlowConfig)
      this.oAuthService.loadDiscoveryDocumentAndLogin().then(response => {    
        console.log(this.oAuthService.getIdentityClaims())
      })
    }
 }
 

import { escape } from 'querystring';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
    readonly loginButton = this.page.locator('#login2');
    readonly usernameField = this.page.locator('#loginusername');
    readonly passwordField = this.page.locator('#loginpassword');
    readonly confirmButton = this.page.locator('button:text("Log in")');
    readonly nameOfUser = this.page.locator('#nameofuser');

    async login(username: string, password: string) {
        await this.loginButton.click();
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.confirmButton.click();
    }
    async welcomeUser() {
        await this.nameOfUser.waitFor({ state: 'visible' });
        return await this.nameOfUser.textContent();
    }
}

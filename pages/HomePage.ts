import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly categoriesMenu = this.page.locator('#itemc');
    readonly productsNames = this.page.locator('#tbodyid h4');
    readonly navbarList = this.page.locator('.nav-item a');

    async clickCategory(category: string) {
        await this.categoriesMenu.filter({ hasText: category }).click();
        await this.page.waitForTimeout(500);
        // await this.page.locator('#itemc', {hasText: category}).click();  
        //await this.page.click(`text=${category}`);
    }

    async getNavbarList(){
        return await this.navbarList.allTextContents();
    }

    async getCategoriesTexts() {
        return await this.categoriesMenu.allTextContents();
    }

    async getAllProductNames() {
        await this.productsNames.last().waitFor({ state: 'visible' });
        return await this.productsNames.allTextContents();
    }

    async clickLinkWithText(linkText: string) {
        const specificLink = await this.page.locator('#tbodyid .hrefch', { hasText: linkText });
        //const secondLink = await this.page.locator('#tbodyid a').nth(1);
        await specificLink.click();
    }
}

import { BasePage } from './BasePage';

export class ProductPage extends BasePage {

    readonly productPrice = this.page.locator('h3.price-container').first();
    readonly addToCart = this.page.locator('a', { hasText: 'Add to cart' });
    readonly productName = this.page.locator('h2.name');
    readonly productDescription = this.page.locator('#more-information p');

    async getProductPrice() {
        await await this.productPrice.waitFor({ state: 'visible' });
        return await this.productPrice.textContent();

    }
    async clickAddToCart() {
        return await this.addToCart.click();
    }
    async getProductName() {
        await await this.productName.waitFor({ state: 'visible' });
        return await this.productName.textContent();
    }
    async getProductDescription() {
        return await this.productDescription.textContent();
    }
}
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import products from '../testdata/products.json';
import categories from '../testdata/categories.json';

test.describe('Product Store Tests', () => {

    test.beforeEach(async ({ page }) => {
       
        await page.goto('/');
        await page.waitForLoadState("networkidle");
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    })

    test('Get title',async ({page}) =>{
        await expect(await page.title()).toEqual('STORE')
    })

    test('Navbar List', async ({page}) =>{
        const navbar = [
            'Home (current)',
            'Contact',
            'About us',
            'Cart',
            'Log in',
            'Log out',
            '',
            'Sign up'
          ]
        const homePage = new HomePage(page);
        await expect(await homePage.getNavbarList()).toEqual(navbar)

    })

    test('Test Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!)
        await expect(await loginPage.welcomeUser()).toContain(process.env.TEST_USERNAME!)

    })

    test('User can navigate to categories and view products', async ({ page }) => {

        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const listTexts = await homePage.getCategoriesTexts()
        await expect(listTexts).toContain('Phones')
        await expect(await homePage.categoriesMenu.count()).toBe(3);

        for (const category of listTexts) {
            await homePage.clickCategory(category);
            let productList = await homePage.getAllProductNames();
            await expect.soft(productList.map(item => item.toLowerCase()))
                .toEqual(categories[category].map(item => item.toLowerCase()));

        };

        const category = 'Phones';
        await homePage.clickCategory(category);
        await page.waitForTimeout(500);

        for (const product of products) {

            await homePage.clickLinkWithText(product.name);
            await page.waitForTimeout(500);
            await expect(await productPage.getProductName()).toContain(product.name)
            await expect(await productPage.getProductPrice()).toContain(product.price)
            await expect(await productPage.getProductDescription()).toContain(product.description)
            await page.goBack();
        }
        await homePage.clickLinkWithText('Nexus 6');
        await page.waitForTimeout(500);
        const dialogEvent = page.waitForEvent('dialog');
        await productPage.clickAddToCart();
        const dialog = await dialogEvent;
        console.log(dialog.message());
        await expect(dialog.message()).toContain('added');
        await dialog.accept();
    });
})

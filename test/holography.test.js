const puppeteer = require('puppeteer');
const { login, checkButton } = require('../utils/common');
require('dotenv').config();

let browser;
let page;

beforeAll(async () => {
    const loginRes = await login(); // YJ 登陆操作
    browser = loginRes.browser;
    page = loginRes.page; // 现在已经为 YJ 首页
    const inputElement = await page.$('.el-input__inner');// 找到搜索框
    await inputElement.type(process.env.TEST_DEVICE_ID); // 查询对应的设备 id
    const buttonElement = await page.$('.el-button.search-btn.is-disabled');
    await checkButton(buttonElement);
    const eventElement = await page.$('div[aria-label="选择/切换案件"]');
    if (eventElement) { // 已经有备案存在
        const linkElement = await page.$('a.link.mr-10');
        await checkButton(linkElement);
    } else {
        // todo 当没有备案需要新增备案的时候
    }
});

afterAll(async () => {
    await browser.close();
});

describe('holography', () => {
    it('should perform related devices', async () => {
        
    });
    
    it('should perform a search', async () => {
        // 找到搜索框并输入关键字
        await page.type('input[type="search"]', 'Puppeteer');

        // 找到搜索按钮并点击
        await page.click('button[type="submit"]');

        // 等待搜索结果页面加载
        await page.waitForSelector('.search-results');

        // 验证搜索结果
        const searchResults = await page.$('.search-results');
        expect(searchResults).not.toBeNull();
    });

    it('should display search results', async () => {
        // 找到搜索框并输入关键字
        await page.type('input[type="search"]', 'Jest');

        // 找到搜索按钮并点击
        await page.click('button[type="submit"]');

        // 等待搜索结果页面加载
        await page.waitForSelector('.search-results');

        // 验证搜索结果
        const searchResults = await page.$('.search-results');
        expect(searchResults).not.toBeNull();

        // 验证搜索结果是否包含期望的内容
        const searchResultsText = await page.evaluate(() => {
            return document.querySelector('.search-results').textContent;
        });
        expect(searchResultsText).toContain('Jest');
    });
});
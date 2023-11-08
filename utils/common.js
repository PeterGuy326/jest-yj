const puppeteer = require('puppeteer');
require('dotenv').config();

export const login = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (process.env.LOGIN_WAY === LOGIN_WAY.SMS) {
        await page.goto(`${process.env.DOMAIN}/sms-login`); // 登陆 yj 首页
        const phoneNumberInput = await page.$('input[data-v-4310be4c][placeholder="请输入手机号"]'); // 找到手机号输入框
        const verificationCodeInput = await page.$('input[data-v-4310be4c][placeholder="请输入验证码"]'); // 找到验证码输入框
        await phoneNumberInput.type(process.env.USER_PHONE); // 替换为实际的手机号
        // todo 如何通过手机号获取验证码
        await verificationCodeInput.type('your_verification_code'); // 替换为实际的验证码
    } else if (process.env.LOGIN_WAY === LOGIN_WAY.ACCOUNT) {
        await page.goto(`${process.env.DOMAIN}/login`); // 登陆 yj 首页
        const phoneNumberInput = await page.$('input[data-v-4310be4c][placeholder="请输入身份证或警号"]');
        const passwordInput = await page.$('input[data-v-4310be4c][placeholder="请输入密码"]');
        await phoneNumberInput.type(process.env.USER_ID_CARD);
        await passwordInput.type(process.env.USER_PASSWORD);
        const loginButton = await page.$('button[data-v-4310be4c].login-button.is-disabled'); // 找到登录按钮
        await checkButton(loginButton);
    }
    return {
        page,
        browser
    };
}

export const checkButton = async (buttonElement) => {
    // 如果按钮存在并未被禁用，点击它
    if (buttonElement) {
        await buttonElement.click();
    } else {
        console.log('按钮不存在或已禁用');
    }
}
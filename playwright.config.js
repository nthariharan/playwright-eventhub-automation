const {defineConfig} = require('@playwright/test');
const {loadEnvFile} = require('node:process');

loadEnvFile();

export default defineConfig({

      testDir :'./tests',
      timeout : 40*1000,
      expect : {
        timeout : 20*1000
      },
      reporter : 'html',
      projects :[
        {
          name: 'chrome',
          use:{
            browserName : 'chromium',
            viewport: null,
            launchOptions : {
              args : ['--start-maximized']
            },
            trace: 'on',
            screenshot : 'on',
            headless : false,
            baseURL : "https://eventhub.rahulshettyacademy.com"
          }
        }
      ]

});
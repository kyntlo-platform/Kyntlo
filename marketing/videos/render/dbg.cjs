const { chromium } = require('playwright'); const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>console.log('LOG',m.text()));await p.goto('file://'+path.resolve(process.argv[2]));await p.waitForTimeout(500);await b.close();})();

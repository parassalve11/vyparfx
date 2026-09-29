// Route, responsive, and interaction checks against a running server (default http://127.0.0.1:3000).
import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base=process.env.BASE_URL||'http://127.0.0.1:3000';
const routes=JSON.parse(await fs.readFile('reference/pages.json','utf8')).map(p=>p.route);
const sizes=[['desktop',1440,1000],['tablet',768,1024],['mobile',390,844],['desktop-large',1920,1080]];
const failures=[];
const fail=(where,message)=>{failures.push(`${where}: ${message}`);console.log(`  FAIL ${where}: ${message}`)};

const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage();
let current='';
page.on('pageerror',error=>fail(current,`page error ${error.message}`));
page.on('console',message=>{if(message.type()==='error')fail(current,`console ${message.text().slice(0,160)}`)});

for(const [size,width,height] of sizes){
 await page.setViewportSize({width,height});
 for(const route of routes){
  current=`${route} @${size}`;
  const response=await page.goto(base+route,{waitUntil:'networkidle'});
  if(response.status()!==200)fail(current,`status ${response.status()}`);
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,20))}scrollTo(0,0)});
  const report=await page.evaluate(()=>{
   const width=document.documentElement.clientWidth;
   const wide=[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width&&r.right>width+1&&getComputedStyle(el).position!=='fixed'&&!el.closest('dialog,.carousel-track')}).slice(0,3).map(el=>`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(el.getBoundingClientRect().right)}`);
   return {overflow:document.documentElement.scrollWidth-width,wide,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),h1:document.querySelectorAll('h1').length};
  });
  if(report.overflow>0)fail(current,`horizontal overflow ${report.overflow}px ${report.wide.join(', ')}`);
  if(report.broken.length)fail(current,`broken images ${report.broken.join(', ')}`);
  if(report.h1!==1&&route!=='/')fail(current,`expected one h1, found ${report.h1}`);
 }
 console.log(`${size}: checked ${routes.length} routes`);
}

// Interactions.
await page.setViewportSize({width:1440,height:1000});
current='accordion';await page.goto(base+'/national-stock-exchange/',{waitUntil:'networkidle'});
const toggle=page.locator('.faq-section .accordion-item button').first();await toggle.click();
if(await toggle.getAttribute('aria-expanded')!=='true')fail(current,'FAQ did not expand');
current='tabs';const tabs=page.locator('.instrument-tabs [role=tab]');await tabs.nth(1).click();
if(await tabs.nth(1).getAttribute('aria-selected')!=='true')fail(current,'second tab not selected');
current='partner form';await page.goto(base+'/affiliate/',{waitUntil:'networkidle'});
await page.fill('#partner-form input[type=email]','ib@example.com');
await page.locator('#partner-form button[type=submit]').click();
if(await page.locator('#partner-form .form-result').count())fail(current,'submitted with missing required fields');
current='article toc';await page.goto(base+'/top-options-trading-mistakes-to-avoid/',{waitUntil:'networkidle'});
for(const href of await page.locator('.article-toc a').evaluateAll(links=>links.map(a=>a.getAttribute('href'))))if(!await page.locator(href).count())fail(current,`missing anchor ${href}`);
await page.setViewportSize({width:390,height:844});
current='mobile menu';await page.goto(base+'/',{waitUntil:'networkidle'});
await page.click('.menu-trigger');
if(!await page.locator('.mobile-drawer[open]').count())fail(current,'drawer did not open');
await page.keyboard.press('Escape');
if(await page.locator('.mobile-drawer[open]').count())fail(current,'drawer did not close on Escape');

await browser.close();
console.log(failures.length?`\n${failures.length} failure(s)`:'\nAll checks passed');
process.exit(failures.length?1:0);

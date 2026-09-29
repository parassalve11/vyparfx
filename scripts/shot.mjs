// Full-page screenshot of local routes: node scripts/shot.mjs <outDir> <width> <route...>
import {chromium} from 'playwright';
const [,,out,width,...routes]=process.argv;
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:Number(width),height:900}});
for(const route of routes){
 await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}scrollTo(0,0)});
 await page.waitForTimeout(1800);
 const name=route.replaceAll('/','')||'home';
 await page.screenshot({path:`${out}/${name}.png`,fullPage:true});
 console.log(name,await page.evaluate(()=>document.body.scrollHeight));
}
await browser.close();

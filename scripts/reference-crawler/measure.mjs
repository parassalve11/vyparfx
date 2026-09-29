// Dump computed geometry/styles for the live elements under a heading's section.
// node scripts/reference-crawler/measure.mjs <route> "<heading text>" [width]
import {chromium} from 'playwright';
const [,,route,headingText,width='1440']=process.argv;
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:Number(width),height:1000}});
await page.goto('https://tradekaro.com'+route,{waitUntil:'networkidle',timeout:90000});
await page.addStyleTag({content:'#zsiq_float,.zsiq_floatmain,[id^=zsiq],.siqembed{display:none!important}'});
const rows=await page.evaluate(text=>{
 const heading=[...document.querySelectorAll('h1,h2,h3')].find(h=>h.textContent.replace(/\s+/g,' ').trim().startsWith(text));
 if(!heading)return ['heading not found'];
 let section=heading;while(section.parentElement&&!section.parentElement.matches('[data-elementor-type=wp-page],main,body,[data-elementor-type=single-post]'))section=section.parentElement;
 const out=[];const top=window.scrollY;
 const walk=(el,depth)=>{const cs=getComputedStyle(el);const r=el.getBoundingClientRect();if(!r.width||cs.display==='none')return;
  const own=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').slice(0,40);
  const interesting=own||el.tagName==='IMG'||cs.backgroundImage!=='none'||cs.borderTopWidth!=='0px'||cs.boxShadow!=='none'||(cs.backgroundColor!=='rgba(0, 0, 0, 0)');
  if(interesting&&depth<14)out.push(`${' '.repeat(depth)}${el.tagName.toLowerCase()}.${[...el.classList].filter(c=>!c.startsWith('elementor-element-')).slice(0,3).join('.')} [${Math.round(r.x)},${Math.round(r.y+top)} ${Math.round(r.width)}x${Math.round(r.height)}]`+
   (own?` "${own}"`:'')+(el.tagName==='IMG'?` src=${el.currentSrc.split('/').pop()}`:'')+
   ` font=${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} c=${cs.color}`+(cs.backgroundColor!=='rgba(0, 0, 0, 0)'?` bg=${cs.backgroundColor}`:'')+(cs.backgroundImage!=='none'?` bgi=${cs.backgroundImage.slice(0,120)}`:'')+
   (cs.borderTopWidth!=='0px'?` border=${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor} r=${cs.borderRadius}`:'')+(cs.boxShadow!=='none'?` shadow=${cs.boxShadow}`:'')+` pad=${cs.padding} m=${cs.margin}`);
  [...el.children].forEach(c=>walk(c,depth+1));};
 walk(section,0);return out;},headingText);
console.log(rows.join('\n'));
await browser.close();

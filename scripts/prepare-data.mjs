import fs from 'node:fs/promises';
const all=JSON.parse(await fs.readFile('reference/assets.json','utf8'));
const map={};for(const a of all.filter(a=>a.publicPath)){const name=a.methods.includes('inline SVG')?a.localPath.split('/').pop():decodeURIComponent(new URL(a.originalUrl).pathname.split('/').pop());const family=name.replace(/-\d+x\d+(?=\.)/,'');if(!map[family]||(a.dimensions?.width||0)>(map[family].width||0))map[family]={src:a.publicPath,width:a.dimensions?.width,height:a.dimensions?.height};map[a.originalUrl]={src:a.publicPath,width:a.dimensions?.width,height:a.dimensions?.height};}
await fs.writeFile('data/assets.json',JSON.stringify(map,null,2));
const raw=JSON.parse(await fs.readFile('reference/content.json','utf8'));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#0?39;/g,"'").replace(/&quot;/g,'"');
const plain=s=>decode(s.replace(/<br\s*\/?\s*>/gi,'\n').replace(/<\/h[1-6]>/gi,'\n').replace(/<[^>]+>/g,'').replace(/[\t ]+/g,' ').replace(/\n\s*\n/g,'\n').trim());
const cleanHtml=s=>s.replace(/href="https:\/\/tradekaro.com\//g,'href="/').replace(/href="https:\/\/tradekaro.theplatformapi.com[^\"]*"/g,'href="/account/register"');
const pages={};
for(const [route,d] of Object.entries(raw))pages[route]={title:d.title,article:cleanHtml(d.article),sections:d.sections.map(s=>({headings:s.headings,blocks:s.widgets.map(w=>({type:w.kind==='text-editor'?'text':w.kind==='image-box'?'feature':w.kind==='icon-box'?'iconFeature':w.kind==='icon-list'?'list':w.kind==='toggle'?'accordion':w.kind,text:plain(w.html),html:cleanHtml(w.html),images:w.images.map(i=>({src:i.src,alt:i.alt})),links:w.links,items:w.accordions,tabs:w.tabs,tabTitles:w.tabTitles})).filter(w=>w.type!=='spacer')})),forms:d.forms};
await fs.writeFile('data/pages.json',JSON.stringify(pages,null,2));
const home=JSON.parse(await fs.readFile('reference/inspection/home.json','utf8'));const extras=JSON.parse(await fs.readFile('reference/assets-discovered.json','utf8'));
for(const w of home.widgets)for(const l of w.links){if(!l.url.includes('lightbox'))continue;try{const hash=decodeURIComponent(new URL(l.url).hash.slice(1));const settings=new URLSearchParams(hash).get('settings');const x=JSON.parse(Buffer.from(settings,'base64').toString());if(x.url&&!extras.some(a=>a.originalUrl===x.url))extras.push({originalUrl:x.url,pages:['https://tradekaro.com/'],methods:['video lightbox'],responsiveVariants:[]});}catch{}}
await fs.writeFile('reference/assets-discovered.json',JSON.stringify(extras,null,2));
console.log('Prepared',Object.keys(pages).length,'pages; asset URLs',extras.length);

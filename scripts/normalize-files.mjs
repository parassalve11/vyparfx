import fs from 'node:fs';
for(const dir of ['app','components','lib','data','scripts']){for(const f of fs.readdirSync(dir,{recursive:true})){const p=dir+'/'+f;if(fs.statSync(p).isFile()&&/\.(jsx?|mjs|css|json)$/.test(p)){const s=fs.readFileSync(p,'utf8');if(s.charCodeAt(0)===0xfeff)fs.writeFileSync(p,s.slice(1));}}}
let p='components/Interactive.jsx';fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('src,poster,children,className','src,poster,children=null,className'));
p='components/HomeSections.jsx';fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('value={value} prefix={prefix}','value={Number(value)} prefix={String(prefix)}'));
p='jsconfig.json';const c=JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));c.compilerOptions.noUncheckedSideEffectImports=false;fs.writeFileSync(p,JSON.stringify(c,null,2));

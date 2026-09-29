import sharp from 'sharp';
import path from 'node:path';
const [,,src,out,tileH='1400',width='900']=process.argv;
const img=sharp(src);const m=await img.metadata();
const th=Number(tileH);let n=0;
for(let y=0;y<m.height;y+=th){const h=Math.min(th,m.height-y);await sharp(src).extract({left:0,top:y,width:m.width,height:h}).resize({width:Number(width)}).png().toFile(path.join(out,`${path.basename(src,'.png')}-${n++}.png`));}
console.log(path.basename(src),m.width,m.height,n);

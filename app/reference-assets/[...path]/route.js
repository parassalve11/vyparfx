import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
const types={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.avif':'image/avif','.gif':'image/gif','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.mp4':'video/mp4','.webm':'video/webm','.pdf':'application/pdf'};
export async function GET(request,{params}) {
 const {path:segments}=await params;
 const root=path.resolve('reference/assets');
 const target=path.resolve(root,...segments);
 if(!target.startsWith(root+path.sep))return new NextResponse('Not found',{status:404});
 try {
  const stat=await fs.stat(target);
  const headers={'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'public, max-age=31536000, immutable','Accept-Ranges':'bytes','X-Content-Type-Options':'nosniff'};
  const range=request.headers.get('range');
  if(range){const match=/^bytes=(\d+)-(\d*)$/.exec(range);if(!match)return new NextResponse(null,{status:416});const start=Number(match[1]);const end=Math.min(match[2]?Number(match[2]):stat.size-1,stat.size-1);if(start>end||start>=stat.size)return new NextResponse(null,{status:416,headers:{'Content-Range':`bytes */${stat.size}`}});const file=await fs.open(target);try{const buffer=Buffer.alloc(end-start+1);await file.read(buffer,0,buffer.length,start);return new NextResponse(buffer,{status:206,headers:{...headers,'Content-Length':String(buffer.length),'Content-Range':`bytes ${start}-${end}/${stat.size}`}});}finally{await file.close();}}
  return new NextResponse(await fs.readFile(target),{headers:{...headers,'Content-Length':String(stat.size)}});
 }catch{return new NextResponse('Not found',{status:404});}
}

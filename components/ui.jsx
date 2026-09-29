import Link from 'next/link';
import { asset, account } from '../lib/site';
import socialIcons from '../data/social-icons.json';
export function Container({children,className=''}) {return <div className={`container ${className}`}>{children}</div>;}
export function Button({children,href=account.register,variant='yellow',className='',arrow=false,...props}) {return <Link href={href} className={`button button-${variant} ${className}`} {...props}>{children}{arrow&&<Icon name="chevron" size={16}/>}</Link>;}
export function Picture({name,alt='',className='',...props}){return <img src={asset(name)} alt={alt} className={className} {...props}/>;}
export function RichText({html,className=''}){return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{__html:html||''}}/>;}
export function SectionTitle({children,className=''}){return <h2 className={`section-title ${className}`}>{children}</h2>;}
export function Divider({reverse=false}){return <Picture name={reverse?'002.svg':'001.svg'} className="section-divider"/>;}
export function Icon({name='check',size=24,className=''}){
const brand=socialIcons[name];
if(brand)return <svg width={size} height={size} viewBox={brand.viewBox} className={className} fill="currentColor" aria-hidden="true" focusable="false"><path d={brand.path}/></svg>;
const paths={chevron:'m9 5 7 7-7 7',down:'m6 9 6 6 6-6',check:'m5 12 4 4L19 6',menu:'M4 6h16M4 12h16M4 18h16',close:'m6 6 12 12M6 18 18 6',arrow:'M5 12h14m-6-6 6 6-6 6',phone:'M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c0 2-2 3-4 2C9 19 5 15 3 7c-1-2 0-4 2-4Z',mail:'M3 5h18v14H3zM3 5l9 8 9-8',shield:'m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z M8 12l3 3 5-6',users:'M16 21v-3c0-3-2-5-5-5s-5 2-5 5v3M17 4a4 4 0 0 1 0 8M20 21v-3a5 5 0 0 0-3-5M11 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',chart:'M4 20V12h4v8M10 20V7h4v13M16 20V3h4v17',headset:'M3 14v-2a9 9 0 0 1 18 0v2M3 12h4v7H3zM17 12h4v7h-4zM20 19c0 3-4 3-8 3',globe:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2',gift:'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8C3 8 5 0 9 3l3 5Zm0 0c9 0 7-8 3-5l-3 5Z',desktop:'M2 3h20v14H2zM12 17v4M7 21h10',play:'m7 3 14 9-14 9Z',location:'M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 1 1 14 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',coins:'M16 5c0 2-3 3-6 3S4 7 4 5s3-3 6-3 6 1 6 3ZM4 5v10c0 2 3 3 6 3M4 10c0 2 3 3 6 3M13 11c0-2 8-2 8 0v8c0 3-8 3-8 0Z M13 15c0 3 8 3 8 0',register:'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3 22v-3c0-4 4-6 9-6M18 14v8M14 18h8'};
return <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={name==='play'?'currentColor':'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.check}/></svg>;
}

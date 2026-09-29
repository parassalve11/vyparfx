import assets from '../data/assets.json';
export function asset(name) {return assets[name]?.src||'';}
export function assetInfo(name){return assets[name]||{};}
export const account={register:process.env.NEXT_PUBLIC_REGISTER_URL||'/account/register',login:process.env.NEXT_PUBLIC_LOGIN_URL||'/account/login',demo:process.env.NEXT_PUBLIC_DEMO_URL||'/account/demo'};
export const downloads={android:'https://android.tradekaro.com/',apple:'https://apps.apple.com/ae/app/trade-karo/id6736365574',desktop:'/account/download',web:'/account/terminal'};
export function localLink(url){if(!url)return '#';if(url.startsWith('https://tradekaro.com/wp-content/'))return asset(url)||url;if(url.startsWith('https://tradekaro.com/'))return url.replace('https://tradekaro.com','');if(url.includes('theplatformapi.com'))return /login|sign-in/.test(url)?account.login:account.register;return url;}


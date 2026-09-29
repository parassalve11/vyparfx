import {createElement} from 'react';
import {notFound} from 'next/navigation';
import pages from '../../data/pages.json';
import {MarketPage,TradingPage} from '../../components/MarketPages';
import {AboutPage,RegulationsPage,TermsPage} from '../../components/AboutPages';
import {PartnerPage,ReferPage} from '../../components/PartnerPages';
import {ContactPage} from '../../components/ContactPage';
import {BlogIndex,ArticlePage} from '../../components/BlogPages';
const marketSlugs=['national-stock-exchange','indian-commodity','foreign-exchange','us-stocks','crypto','comex'];
const views={
 'intraday-trading':TradingPage,'margin-trading':TradingPage,'terms-and-condition':TermsPage,'about-us':AboutPage,'regulations':RegulationsPage,
 'affiliate':PartnerPage,'white-label':PartnerPage,'refer-a-friend':ReferPage,'contact-us':ContactPage,'blog':BlogIndex,
 ...Object.fromEntries(marketSlugs.map(slug=>[slug,MarketPage])),
};
function view(slug){const data=pages[`/${slug}/`];if(!data)return null;return views[slug]||(data.article?ArticlePage:null);}
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(pages).filter(route=>route!=='/').map(route=>({slug:route.replaceAll('/','')})).filter(({slug})=>view(slug))}
export async function generateMetadata({params}){const {slug}=await params;const data=pages[`/${slug}/`];return {title:data?.sections[0]?.headings[0]?.replace(/\s+/g,' ')||'TradeKaro'}}
export default async function Page({params}){const {slug}=await params;const View=view(slug);if(!View)notFound();return createElement(View,{data:pages[`/${slug}/`],slug})}

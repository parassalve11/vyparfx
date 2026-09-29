import Link from 'next/link';
import {Container,Button,Picture,SectionTitle} from './ui';
import {GuideCard} from './HomeSections';
import {ContactStrip} from './Footer';
import {articles} from '../data/site';
import {account} from '../lib/site';

export function BlogIndex({data}){const hero=data.sections[0];
 return <>
 <section className="page-hero centered-hero slim-hero blog-hero"><Container><h1>{hero.headings[0]}</h1><p className="hero-kicker">{hero.blocks.find(b=>b.type==='text')?.text}</p></Container></section>
 <section className="blog-list"><Container><div className="post-grid">{articles.map(article=><GuideCard key={article.slug} article={article}/>)}</div></Container></section>
 <ContactStrip/>
 </>}

const slugify=text=>text.toLowerCase().replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const plain=html=>html.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').trim();
// Give every h2–h4 an id and collect them for the table of contents.
function withAnchors(html,toc){return html.replace(/<(h[2-4])([^>]*)>([\s\S]*?)<\/\1>/g,(match,tag,attrs,inner)=>{const text=plain(inner);if(!text)return match;const id=slugify(text);toc.push({id,text,level:tag==='h2'?1:2});return `<${tag}${attrs} id="${id}">${inner}</${tag}>`})}
function numbered(items){let major=0,minor=0;return items.map(item=>{if(item.level===1){major++;minor=0;return {...item,number:`${major}.`}}minor++;return {...item,number:`${major}.${minor}.`}})}
const clean=html=>html.replace(/[\t ]*\n[\t\n ]*/g,'\n');

function renderBody(section,toc){const blocks=section.blocks.filter(b=>['image','text','heading','button'].includes(b.type));const standalone=blocks.some(b=>b.type==='text');
 if(!standalone){const content=section.blocks.find(b=>b.type==='theme-post-content');return <div className="rich-text article-body" dangerouslySetInnerHTML={{__html:withAnchors(clean(content?.html||''),toc)}}/>}
 // Posts built from separate blocks keep their images and call-to-action panel in place.
 const out=[];for(let i=0;i<blocks.length;i++){const b=blocks[i];if(b.type==='heading'&&b.text==='Share')break;
  if(b.type==='image')out.push(<Picture key={i} name={b.images[0]?.src} alt="" className="article-image"/>);
  else if(b.type==='text')out.push(<div key={i} className="rich-text article-body" dangerouslySetInnerHTML={{__html:withAnchors(clean(b.html),toc)}}/>);
  else if(b.type==='heading'){const note=blocks[i+1]?.type==='text'?blocks[++i]:null;const buttons=[];while(blocks[i+1]?.type==='button')buttons.push(blocks[++i]);toc.push({id:slugify(b.text),text:b.text,level:1});out.push(<aside key={i} className="article-cta" id={slugify(b.text)}><h2>{b.text}</h2>{note&&<p>{note.text}</p>}<div>{buttons.map((btn,j)=><Button key={j} variant={j?'white':'black'} href={j?account.demo:account.register}>{btn.text}</Button>)}</div></aside>)}}
 return out}

export function ArticlePage({data,slug}){const [hero,body]=data.sections;const index=articles.findIndex(a=>a.slug===slug);const previous=articles[index+1];const next=articles[index-1];const related=articles.filter(a=>a.slug!==slug);const toc=[{id:'article-title',text:hero.headings[0],level:1}];const url=`https://tradekaro.com/${slug}/`;const title=hero.headings[0];
 // Rendering the body first fills the table of contents in document order.
 const rendered=renderBody(body,toc);
 return <>
 <section className="page-hero centered-hero slim-hero article-hero"><Container><h1 id="article-title">{title}</h1></Container></section>
 <article className="article"><Container>
  <details className="article-toc" open><summary>Table of Contents</summary><ol>{numbered([...toc,{id:'share',text:'Share',level:1},{id:'related-posts',text:'Related Posts',level:1}]).map((item,i)=><li key={i} className={`toc-level-${item.level}`}><a href={`#${item.id}`}><span>{item.number}</span>{item.text}</a></li>)}</ol></details>
  {rendered}
  <h2 className="share-title" id="share">Share</h2>
  <div className="share-buttons">{[['Facebook',`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`],['X',`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`],['WhatsApp',`https://api.whatsapp.com/send?text=${encodeURIComponent(title+' '+url)}`]].map(([name,href])=><a key={name} href={href} target="_blank" rel="noreferrer" className={`share-${name.toLowerCase()}`}>{name}</a>)}</div>
  <nav className="post-navigation" aria-label="More posts">{previous?<Link href={`/${previous.slug}/`}><span>Previous</span>{previous.title}</Link>:<span/>}{next&&<Link href={`/${next.slug}/`} className="post-next"><span>Next</span>{next.title}</Link>}</nav>
  <section className="related-posts" aria-labelledby="related-posts"><SectionTitle><span id="related-posts">Related Posts</span></SectionTitle><div className="post-grid">{related.map(article=><GuideCard key={article.slug} article={article}/>)}</div></section>
 </Container></article>
 <ContactStrip/>
 </>}

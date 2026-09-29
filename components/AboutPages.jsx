import {Container,Picture,RichText,SectionTitle} from './ui';
import {PageHero} from './MarketPages';
import {FeatureGrid,Stats} from './HomeSections';
import {AccountCTA,ContactStrip} from './Footer';
import {localLink} from '../lib/site';
const texts=(section,type)=>section.blocks.filter(b=>b.type===type);
const lines=block=>block.text.split('\n').map(s=>s.trim()).filter(Boolean);
function highlight(text,word){const [before,...rest]=text.split(word);return rest.length?<>{before}<em>{word}</em>{rest.join(word)}</>:text}

export function AboutPage({data}){const [hero,why,zero,compare,markets]=data.sections;const zeroHeads=texts(zero,'heading').map(b=>b.text);const table=zero.blocks.find(b=>b.type==='html');const [params,ours,theirs]=texts(compare,'list').map(lines);const marketNames=texts(markets,'heading').slice(1,8).map(b=>b.text);const currency=texts(markets,'heading')[8]?.text;
 return <>
 <PageHero section={hero} className="about-hero"/>
 <section className="grid-background about-why"><Container><SectionTitle>Why choose <em>TradeKaro?</em></SectionTitle><FeatureGrid blocks={texts(why,'feature')} className="side-icon-features"/></Container></section>
 <section className="zero-platform"><Container>
  <SectionTitle>{highlight(zeroHeads[0],'ZERO')}</SectionTitle><p className="zero-subtitle">{texts(zero,'text')[0]?.text}</p>
  <div className="zero-stats"><div><span>{zeroHeads[1]}</span><strong>{zeroHeads[2]}</strong></div><Picture name="zero_line.svg" alt=""/><div><span>{zeroHeads[3]}</span><strong>{zeroHeads[4]}</strong></div></div>
  <h2 className="zero-capital">{zeroHeads[5]}</h2>
  <div className="capital-card"><div className="capital-figures"><strong>{zeroHeads[6]}</strong><span>{zeroHeads[7]}</span><strong>{zeroHeads[8]}</strong><span>{zeroHeads[9]}</span></div><div className="capital-table"><h3>{zeroHeads[10]}</h3><RichText html={table?.html}/></div></div>
 </Container></section>
 <section className="grid-background compare-section"><Container><SectionTitle>{compare.headings[0]}</SectionTitle>
  <div className="compare-table" role="table" aria-label="TradeKaro compared with other brokers">
   {[[compare.headings[1],params,'compare-params'],[compare.headings[2],ours,'compare-ours'],[compare.headings[3],theirs,'compare-others']].map(([title,rows,cls])=><div key={cls} className={cls} role="rowgroup"><h3 role="columnheader">{title}</h3><ul>{rows.map((row,i)=><li key={i} role="cell">{row}</li>)}</ul></div>)}
  </div>
 </Container></section>
 <section className="all-markets"><Container><SectionTitle>Trade <em>All Markets</em> in One Platform!</SectionTitle>
  <ul className="market-boxes">{marketNames.map(name=><li key={name}>{name}</li>)}</ul>
  <p className="currency-line">{currency}</p>
  <div className="currency-choice"><Picture name="rupis.svg" alt="Indian rupee"/><span>OR</span><Picture name="dolor.svg" alt="US dollar"/></div>
 </Container></section>
 <Stats/><AccountCTA/><ContactStrip/>
 </>}

export function RegulationsPage({data}){const [hero,docs,security]=data.sections;const regs=texts(docs,'heading').map((h,i)=>({title:h.text,text:texts(docs,'text')[i]?.text}));
 return <>
 <section className="page-hero centered-hero slim-hero"><Container><h1>{hero.headings[0]}</h1><p className="hero-kicker">{hero.headings[1]}</p></Container></section>
 <section className="regulation-docs"><Container>
  <div className="regulator-grid">{regs.map(reg=><article key={reg.title} className="regulator-card"><h2>{reg.title}</h2><p>{reg.text}</p></article>)}</div>
  <div className="document-grid">{texts(docs,'feature').map(doc=><a key={doc.text} className="document-card" href={localLink(doc.links[0]?.url)} target="_blank" rel="noreferrer"><Picture name={doc.images[0]?.src} alt=""/><span>{doc.text}</span></a>)}</div>
 </Container></section>
 <section className="grid-background security-section"><Container><SectionTitle>{security.headings[0]}</SectionTitle>
  <ul className="security-card">{texts(security,'feature').map(item=><li key={item.text}><Picture name={item.images[0]?.src} alt=""/><p>{item.text}</p></li>)}</ul>
 </Container></section>
 <ContactStrip/>
 </>}

export function TermsPage({data}){const [hero,...parts]=data.sections;
 return <>
 <section className="page-hero centered-hero slim-hero"><Container><h1>{hero.headings[0]}</h1></Container></section>
 <section className="terms-content"><Container>{parts.map(part=><article key={part.headings[0]}><h2>{part.headings[0]}</h2><RichText html={texts(part,'text')[0]?.html}/></article>)}</Container></section>
 <ContactStrip/>
 </>}

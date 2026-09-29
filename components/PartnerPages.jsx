import {Container,Button,Icon,Picture,SectionTitle} from './ui';
import {PageHero} from './MarketPages';
import {ContactStrip} from './Footer';
import ContactForm from './ContactForm';
import {account} from '../lib/site';
const of=(section,type)=>section.blocks.filter(b=>b.type===type);

// Blocks after the two section headings repeat as: number heading, image, title heading, optional text.
function stepsFrom(section){const steps=[];for(const block of section.blocks.slice(2)){if(block.type==='heading'&&/^\d+$/.test(block.text.trim()))steps.push({number:block.text.trim(),image:null,title:null,text:null});else if(!steps.length)continue;else{const step=steps.at(-1);if(block.type==='image'&&!step.image)step.image=block.images[0]?.src;else if(block.type==='heading'&&!step.title)step.title=block.text;else if(block.type==='text'&&!step.text)step.text=block.text;else if(step.title&&step.text)break;}}return steps}

function HowItWorks({section}){const steps=stepsFrom(section);const used=new Set(steps.flatMap(s=>[s.title,s.text]));const extras=[];const rest=section.blocks.slice(2).filter(b=>(b.type==='heading'||b.type==='text')&&!/^\d+$/.test(b.text.trim())&&!used.has(b.text));for(let i=0;i<rest.length;i+=2)extras.push([rest[i],rest[i+1]]);
 return <section className="how-it-works"><Container>
  <SectionTitle>{section.headings[0]}</SectionTitle><p className="how-subtitle">{section.headings[1]}</p>
  <ol className={`step-cards steps-${steps.length}`}>{steps.map(step=><li key={step.number}><span className="step-number">{step.number}</span><div><Picture name={step.image} alt=""/><h3>{step.title}</h3>{step.text&&<p>{step.text}</p>}</div></li>)}</ol>
  {extras.length>0&&<div className="partner-info">{extras.map(([title,text])=><article key={title.text}><h3>{title.text}</h3><p>{text?.text}</p></article>)}</div>}
 </Container></section>}

export function PartnerPage({data}){const [hero,program,how,join]=data.sections;const fields=data.forms[0]?.fields||[];
 return <>
 <PageHero section={hero} className="partner-hero"/>
 <section className="grid-background ib-programs"><Container>
  <SectionTitle>{program.headings[0]}</SectionTitle>
  <div className="ib-grid"><Picture name={of(program,'image')[0]?.images[0]?.src} alt=""/><ul>{of(program,'iconFeature').map(item=><li key={item.text}><Picture name="true.svg" alt=""/>{item.text}</li>)}</ul></div>
 </Container></section>
 <HowItWorks section={how}/>
 <section className="grid-background join-partner"><Container>
  <SectionTitle>{join.headings[0]}</SectionTitle><p className="how-subtitle">{join.headings[1]}</p>
  <ContactForm fields={fields} partner/>
 </Container></section>
 <ContactStrip/>
 </>}

export function ReferPage({data}){const [hero,share,how]=data.sections;const heads=of(share,'heading').map(b=>b.text);
 return <>
 <PageHero section={hero} className="partner-hero refer-hero"/>
 <section className="grid-background referral-share"><Container>
  <SectionTitle>{heads[0]}</SectionTitle><p className="referral-commission">{heads[1]}</p>
  <h3>{heads[2]}</h3><p>{heads[3]}</p>
  <Button variant="black" href={account.register}><Icon name="register" size={16}/>{of(share,'button')[0]?.text}</Button>
 </Container></section>
 <HowItWorks section={how}/>
 <ContactStrip/>
 </>}

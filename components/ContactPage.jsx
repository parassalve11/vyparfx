import {Container,Icon,SectionTitle} from './ui';
import {asset} from '../lib/site';
import {ContactStrip} from './Footer';
import ContactForm from './ContactForm';
const socialIcons={'Like Us':'facebook','Follow US':'instagram','Subscribe':'youtube','Join Us':'telegram'};

export function ContactPage({data}){const [intro,social]=data.sections;const texts=intro.blocks.filter(b=>b.type==='text');const [title,rest]=intro.headings[0].split('Experts');
 return <>
 <section className="grid-background contact-intro"><Container className="contact-intro-grid">
  <div className="contact-details">
   <h1>{title}<em>Experts</em>{rest}</h1><p>{texts[0]?.text}</p>
   <h2>{intro.headings[1].replace(/\s+/g,' ')}</h2><address>{texts[1]?.text}</address>
   <div className="contact-portrait" role="img" aria-label="VyaparFX support specialist" style={{backgroundImage:`url('${asset('cont.png')}')`}}/>
  </div>
  <ContactForm fields={data.forms[0]?.fields||[]}/>
 </Container></section>
 <section className="stay-connected"><Container><div className="stay-card">
  <SectionTitle>{social.headings[0]}</SectionTitle>
  <ul>{social.blocks.filter(b=>b.type==='iconFeature').map(item=><li key={item.text}><a href={item.links[0]?.url} target="_blank" rel="noreferrer"><span aria-hidden="true"><Icon name={socialIcons[item.text]||"globe"} size={24}/></span><strong>{item.text}</strong></a></li>)}</ul>
 </div></Container></section>
 <ContactStrip/>
 </>}

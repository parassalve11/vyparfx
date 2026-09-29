import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
export const metadata={title:{default:'TradeKaro | Trade All Markets',template:'%s | TradeKaro'},description:'Explore the TradeKaro public trading website: markets, platform features, quick guides, and partnership opportunities.'};
export default function RootLayout({children}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></body></html>}

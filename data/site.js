export const navigation = [
 {label:'Markets',items:[['NSE (Futures & Options)','national-stock-exchange'],['Indian Commodity','indian-commodity'],['Forex','foreign-exchange'],['US Stocks & Indices','us-stocks'],['Cryptos','crypto'],['Comex','comex']]},
 {label:'Trading',items:[['Intraday Trading','intraday-trading'],['Margin Trading','margin-trading'],['Terms & Conditions','terms-and-condition']]},
 {label:'Learn',items:[['Stock Trading',null],['Commodity Trading',null],['Forex Trading',null],['Quick Guides','blog']]},
 {label:'About',items:[['Why TradeKaro?','about-us'],['Regulations','regulations'],['Become an Agent or Affiliate','affiliate'],['Refer a Friend','refer-a-friend'],['White Label','white-label']]},
 {label:'Contact',href:'/contact-us/'}
];
export const markets=[
 {name:'NSE',slug:'national-stock-exchange',items:['NSE Futures','NSE Options'],image:'Untitled-1-2.png'},
 {name:'Indian Commodity',slug:'indian-commodity',items:['Metals','Base Metals','Energies'],image:'commodities-1.png'},
 {name:'Forex',slug:'foreign-exchange',items:['Forex Major','Forex Minors'],image:'2.png'},
 {name:'Comex',slug:'comex',items:['Base Metals','Metals','Energies'],image:'COMMODITIES_F.png'},
 {name:'US Stocks Indices',slug:'us-stocks',items:['Dow Jones','Nasdaq','S&P 500','DAX 30'],image:'FOREX_1.png'},
 {name:'Cryptos',slug:'crypto',items:['Bitcoin','Litecoin','Ripple','Etherium'],image:'1.png'}
];
export const articles=[
 {title:'Common Mistakes to Avoid in NSE Day Trading',slug:'common-mistakes-to-avoid-in-nse-day-trading-2',image:'blog7.png',date:'August 11, 2024'},
 {title:'Building a Winning Trading Plan for NSE Transactions',slug:'building-a-winning-trading-plan-for-nse-transactions',image:'blog6.png',date:'August 8, 2024'},
 {title:'Insider Insights on NSE Market Volatility',slug:'insider-insights-on-nse-market-volatility',image:'blog8.png',date:'August 8, 2024'},
 {title:'Top Options Trading Mistakes to Avoid',slug:'top-options-trading-mistakes-to-avoid',image:'blog12.jpg',date:'August 8, 2024'}
];
// TradingView embeds used by the reference market pages (script name + widget config).
const miniSymbol=symbol=>({script:'mini-symbol-overview',config:{symbol,width:350,height:220,locale:'en',dateRange:'12M',colorTheme:'light',isTransparent:false,autosize:false,largeChartUrl:''}});
const fxGroup=(name,pairs)=>({name,symbols:pairs.map(([a,b])=>({name:`FX_IDC:${a}${b}`,displayName:`${a} to ${b}`}))});
export const marketWidgets={
 crypto:miniSymbol('BITFINEX:BTCUSD'),
 comex:miniSymbol('PYTH:XAUUSD'),
 'foreign-exchange':{script:'market-quotes',config:{title:'Currencies',width:'100%',height:'100%',locale:'en',showSymbolLogo:true,colorTheme:'light',symbolsGroups:[
  fxGroup('Major',[['EUR','USD'],['USD','JPY'],['GBP','USD'],['AUD','USD'],['USD','CAD'],['USD','CHF']]),
  fxGroup('Minor',[['EUR','GBP'],['EUR','JPY'],['GBP','JPY'],['CAD','JPY'],['GBP','CAD'],['EUR','CAD']]),
  fxGroup('Exotic',[['USD','SEK'],['USD','MXN'],['USD','ZAR'],['EUR','TRY'],['EUR','NOK'],['GBP','PLN']])]}},
 'us-stocks':{script:'hotlists',config:{colorTheme:'light',dateRange:'12M',exchange:'US',showChart:true,locale:'en',largeChartUrl:'',isTransparent:false,showSymbolLogo:false,showFloatingTooltip:false,width:'400',height:'500',plotLineColorGrowing:'rgba(41, 98, 255, 1)',plotLineColorFalling:'rgba(41, 98, 255, 1)',gridLineColor:'rgba(42, 46, 57, 0)',scaleFontColor:'rgba(209, 212, 220, 1)',belowLineFillColorGrowing:'rgba(41, 98, 255, 0.12)',belowLineFillColorFalling:'rgba(41, 98, 255, 0.12)',belowLineFillColorGrowingBottom:'rgba(41, 98, 255, 0)',belowLineFillColorFallingBottom:'rgba(41, 98, 255, 0)',symbolActiveColor:'rgba(41, 98, 255, 0.12)'}},
};

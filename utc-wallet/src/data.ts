export const COIN_IDS = ['bitcoin','ethereum','binancecoin','solana','ripple','tether']
export const NAV = [
  { to: '/markets', label: 'Markets' }, { to: '/security', label: 'Security' },
  { to: '/news', label: 'News' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }
]
export const PRODUCTS = [
  { to: '/wallet', label: 'Wallet' },
  { to: '/buy', label: 'Buy Crypto' }, { to: '/trading', label: 'Trading' }, { to: '/swap', label: 'Swap' },
  { to: '/staking', label: 'Earn' }, { to: '/web3', label: 'Web3' }
]
export type Info = { title: string; intro: string; items: [string, string][]; note?: string }
export const PAGES: Record<string, Info> = {
  wallet: { title: 'UTC Wallet: you hold the keys', intro: 'UTC Wallet is planned as a self-custody wallet: you control your assets and your recovery phrase, and UTC never sees them.',
    items: [['Self-custody','Only you hold your keys. UTC cannot move or recover your funds.'],['Send and receive','Support for the assets listed on the Markets page, depending on the wallet SDK chosen.'],['Connect to Web3','Link to decentralized apps with standard wallet connections.'],['Backup','You write down your recovery phrase offline and never share it.'],['Device protection','Passcode and biometric lock on your device.'],['Transparent activity','Every transfer can be checked on a public block explorer.']],
    note: 'The wallet is not released. Building one needs an independently audited wallet SDK. This website never asks for, stores or imports recovery phrases or private keys. Anyone who asks you for yours is a scammer.' },
  about: { title: 'Building Opportunities Across Global Financial Markets',
    intro: 'United Trading Company (UTC) is an international business organization with a legacy dating back to 1965. With experience across international trade, investments, financial markets, and emerging technologies, UTC continues to explore opportunities in the evolving digital economy.',
    items: [['History','Founded in 1965 in international trade, expanded into financial markets, forex and cryptocurrency.'],['Vision','A trusted gateway between established markets and digital finance.'],['Mission','Give clients clear, responsible access to modern financial technology.'],['Leadership','Leadership profiles to be supplied by UTC before launch.'],['Business activities','International trade, forex, cryptocurrency and other sectors.'],['Global outlook','Operating across borders with a long-term view of markets.']] },
  buy: { title: 'Buy and sell digital assets', intro: 'Explore how buying and selling crypto works with UTC.',
    items: [['Payment options','Supported methods will depend on the payment provider UTC integrates.'],['Clear pricing','Fees are shown before you confirm any order.'],['Order flow','Choose an asset, enter an amount, review, confirm.']],
    note: 'Buying requires a licensed on-ramp provider and backend. This page is informational; no purchase can be made here.' },
  trading: { title: 'Spot trading', intro: 'Charts, order panels and volume data for the markets UTC will list.',
    items: [['Market charts','Live 7-day charts are on the Markets page.'],['Buy / sell panel','Requires a trading engine or exchange API.'],['Volume and trends','Sourced from a market data API.']],
    note: 'Trading is not live on this site. Crypto trading carries a high risk of loss.' },
  staking: { title: 'Earn with staking', intro: 'Staking locks digital assets to help secure a blockchain network, and may earn rewards.',
    items: [['Supported assets','To be confirmed with the staking provider.'],['Rewards','Rewards are variable and not guaranteed.'],['Lock-ups','Some networks require lock-up or unbonding periods.']],
    note: 'No reward rates are displayed because none are offered yet. Principal can lose value.' },
  web3: { title: 'Web3 and DeFi', intro: 'Decentralized applications run on blockchains instead of a single company\'s servers.',
    items: [['Decentralized finance','Lending, trading and savings built from smart contracts.'],['Smart contracts','Code that runs automatically when set conditions are met.'],['NFTs','Unique tokens that record ownership of digital items.'],['Connectivity','Users connect their own self-custody wallet to apps.']],
    note: 'UTC will never ask for your recovery phrase or private keys.' },
  security: { title: 'Security you can act on', intro: 'Good security is shared between a platform and its users.',
    items: [['Two-factor authentication','Planned for every account.'],['Device security','Keep your devices updated and locked.'],['Transparent transactions','Blockchain transfers can be verified on public explorers.'],['Privacy','We collect only what an account needs.'],['Risk awareness','Beware of phishing and fake support.'],['Secure access','Sign-in will use a secure backend authentication service.']],
    note: 'UTC does not claim any certification, audit or insurance on this site.' },
  news: { title: 'News and insights', intro: 'Sample content, clearly marked. Connect a news API or CMS to publish real articles.',
    items: [['Sample · Market update','What moves crypto prices'],['Sample · Education','Blockchain explained simply'],['Sample · Insight','Risk management for new traders']] }
}
export const FAQ: [string, string][] = [
  ['What is cryptocurrency?','Digital money secured by cryptography and recorded on a blockchain.'],
  ['How does crypto trading work?','Buyers and sellers place orders on a market. Prices change constantly and you can lose money.'],
  ['What is blockchain?','A shared ledger that many computers keep in sync, so records are hard to alter.'],
  ['What is Web3?','Internet applications that use blockchains and user-owned wallets.'],
  ['How can I buy cryptocurrency?','Through a regulated on-ramp. UTC\'s buying flow is not live yet.'],
  ['What is crypto staking?','Locking assets to support a network. Rewards vary and are not guaranteed.'],
  ['How does UTC operate?','UTC is an international trading company founded in 1965.'],
  ['How can I contact UTC?','Use the Contact page form.']
]

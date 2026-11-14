import { useState, FormEvent } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ShieldCheck, ArrowDownUp, Search } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts'
import { NAV, PRODUCTS, PAGES, FAQ, Info } from './data'
import { useCoins, useTitle, usd, Coin } from './hooks'

const Logo = () => <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white"><span className="grad grid h-8 w-8 place-items-center rounded-lg text-sm">U</span>UTC Wallet</Link>

function Nav() {
  const [open, setOpen] = useState(false); const [dd, setDd] = useState(false)
  const link = 'text-slate-300 hover:text-white transition'
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={link}>Home</NavLink>
          <div className="relative" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
            <button className={link + ' flex items-center gap-1'} aria-expanded={dd} onClick={() => setDd(!dd)}>Products <ChevronDown size={16} /></button>
            <AnimatePresence>{dd && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 top-full w-48 pt-3">
              <div className="card p-2">{PRODUCTS.map(p => <Link key={p.to} to={p.to} onClick={() => setDd(false)} className="block rounded-lg px-3 py-2 hover:bg-line">{p.label}</Link>)}</div></motion.div>}</AnimatePresence>
          </div>
          {NAV.map(n => <NavLink key={n.to} to={n.to} className={link}>{n.label}</NavLink>)}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="px-3 text-white">Log in</Link>
          <Link to="/login?mode=register" className="btn grad text-white">Get started</Link>
        </div>
        <button className="lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <div className="border-t border-line px-5 pb-5 lg:hidden">
        {[{ to: '/', label: 'Home' }, ...PRODUCTS, ...NAV, { to: '/login', label: 'Log in' }].map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 text-lg">{n.label}</Link>)}
        <Link to="/login?mode=register" onClick={() => setOpen(false)} className="btn grad mt-2 w-full text-white">Get started</Link>
      </div>}
    </header>
  )
}

function Footer() {
  const cols: [string, [string, string][]][] = [
    ['Products', PRODUCTS.map(p => [p.label, p.to] as [string, string])],
    ['Company', [['About UTC', '/about'], ['Security', '/security'], ['News', '/news'], ['Contact', '/contact']]],
    ['Legal', [['Privacy Policy', '/contact'], ['Terms and Conditions', '/contact'], ['Risk Disclosure', '/contact']]]
  ]
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div><Logo /><p className="mt-4 text-sm text-slate-400">UTC Wallet by United Trading Company. Trading since 1965.</p></div>
        {cols.map(([h, ls]) => <div key={h}><h2 className="mb-3 font-bold text-white">{h}</h2>{ls.map(([l, t]) => <Link key={l} to={t} className="block py-1 text-sm text-slate-400 hover:text-white">{l}</Link>)}</div>)}
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-10 text-xs text-slate-500">Risk disclosure: cryptocurrency is volatile and you can lose all the money you put in. Nothing here is financial advice. Legal pages are placeholders pending review by UTC's counsel. © {new Date().getFullYear()} United Trading Company. UTC Wallet is a product of UTC.</p>
    </footer>
  )
}

function Spark({ c }: { c: Coin }) {
  const d = c.sparkline_in_7d.price.map((p, i) => ({ i, p })); const up = c.price_change_percentage_24h >= 0
  return <div className="h-14"><ResponsiveContainer><LineChart data={d}><YAxis hide domain={['auto', 'auto']} /><Line type="monotone" dataKey="p" dot={false} strokeWidth={2} stroke={up ? '#22D3EE' : '#F472B6'} isAnimationActive={false} /></LineChart></ResponsiveContainer></div>
}

function CoinCard({ c }: { c: Coin }) {
  const ch = c.price_change_percentage_24h ?? 0
  return <div className="card transition hover:-translate-y-1 hover:border-blue">
    <div className="flex items-center gap-3"><img src={c.image} alt="" loading="lazy" width={32} height={32} /><div><p className="font-bold text-white">{c.name}</p><p className="text-xs uppercase text-slate-400">{c.symbol}</p></div></div>
    <p className="mt-4 text-2xl font-bold text-white">{usd(c.current_price)}</p>
    <p className={ch >= 0 ? 'text-cyan' : 'text-pink-400'}>{ch >= 0 ? '+' : ''}{ch.toFixed(2)}% 24h</p>
    <Spark c={c} /><p className="mt-2 text-xs text-slate-400">Market cap {usd(c.market_cap)}</p>
  </div>
}

function CoinGrid({ filter = '', dir = 'all' }: { filter?: string; dir?: string }) {
  const { coins, error, loading } = useCoins()
  if (loading) return <p role="status">Loading live prices…</p>
  if (error) return <p className="card text-pink-300">Live prices could not be loaded from CoinGecko. Check your connection and refresh. No placeholder prices are shown.</p>
  const list = coins.filter(c => (c.name + c.symbol).toLowerCase().includes(filter.toLowerCase())).filter(c => dir === 'all' || (dir === 'up') === (c.price_change_percentage_24h >= 0))
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(c => <CoinCard key={c.id} c={c} />)}{!list.length && <p>No assets match.</p>}</div>
}

const Faq = () => {
  const [o, setO] = useState<number | null>(null)
  return <div className="mx-auto max-w-3xl">{FAQ.map(([q, a], i) => <div key={q} className="border-b border-line">
    <button className="flex w-full items-center justify-between py-5 text-left text-lg text-white" aria-expanded={o === i} onClick={() => setO(o === i ? null : i)}>{q}<ChevronDown className={`transition ${o === i ? 'rotate-180' : ''}`} /></button>
    <AnimatePresence>{o === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-slate-400">{a}</motion.p>}</AnimatePresence></div>)}</div>
}

function Home() {
  useTitle('Your Gateway to the Future of Digital Finance')
  return <>
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet/30 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl text-5xl font-bold leading-[1.05] text-white md:text-7xl">Your Gateway to the Future of <span className="grad-text">Digital Finance</span></motion.h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">Explore cryptocurrency, discover blockchain opportunities, and experience the next generation of digital financial markets with UTC Wallet.</p>
        <div className="mt-8 flex flex-wrap gap-4"><Link to="/markets" className="btn grad text-white">Explore Crypto</Link><Link to="/login?mode=register" className="btn border border-line text-white hover:border-blue">Get Started</Link></div>
        <div className="mt-14"><p className="mb-4 text-sm text-slate-400">Live prices from CoinGecko</p><CoinGrid /></div>
      </div>
    </section>
    <section className="mx-auto mt-10 grid max-w-6xl gap-5 px-5 md:grid-cols-3">
      {[['Crypto Wallet', '/wallet'], ['Buy & Sell', '/buy'], ['Trading', '/trading'], ['Token Swap', '/swap'], ['Staking & Rewards', '/staking'], ['Web3 Applications', '/web3']].map(([t, to]) =>
        <Link key={t} to={to} className="card transition hover:-translate-y-1 hover:border-violet"><h2 className="text-xl font-bold text-white">{t}</h2><p className="mt-2 text-sm text-slate-400">Learn more</p></Link>)}
    </section>
    <section className="mx-auto mt-24 max-w-6xl px-5"><div className="card flex flex-wrap items-center justify-between gap-6 p-10"><div><p className="grad-text text-6xl font-bold">1965</p><p className="mt-2 text-slate-300">Trading since. Now in digital finance.</p></div><Link to="/about" className="btn border border-line text-white">About UTC</Link></div></section>
    <section className="mt-24 px-5"><h2 className="mb-8 text-center text-3xl font-bold text-white">Frequently asked questions</h2><Faq /></section>
  </>
}

function Markets() {
  useTitle('Markets'); const [q, setQ] = useState(''); const [dir, setDir] = useState('all')
  return <main className="mx-auto max-w-6xl px-5 py-14"><h1 className="text-4xl font-bold text-white">Crypto markets</h1>
    <div className="my-6 flex flex-wrap gap-3"><label className="relative flex-1"><span className="sr-only">Search</span><Search className="absolute left-3 top-3.5 text-slate-500" size={18} /><input className="input pl-10" placeholder="Search assets" value={q} onChange={e => setQ(e.target.value)} /></label>
      <select aria-label="Filter" className="input w-auto" value={dir} onChange={e => setDir(e.target.value)}><option value="all">All</option><option value="up">Gainers 24h</option><option value="down">Losers 24h</option></select></div>
    <CoinGrid filter={q} dir={dir} /></main>
}

function Swap() {
  useTitle('Swap'); const { coins, error } = useCoins(); const [a, setA] = useState('bitcoin'); const [b, setB] = useState('ethereum'); const [amt, setAmt] = useState('1')
  const pa = coins.find(c => c.id === a)?.current_price, pb = coins.find(c => c.id === b)?.current_price
  const out = pa && pb ? (Number(amt) || 0) * pa / pb : null
  const sel = (v: string, f: (s: string) => void, l: string) => <select aria-label={l} className="input" value={v} onChange={e => f(e.target.value)}>{coins.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
  return <main className="mx-auto max-w-xl px-5 py-14"><h1 className="text-4xl font-bold text-white">Swap calculator</h1>
    <p className="mt-3 rounded-xl border border-violet/40 bg-violet/10 p-3 text-sm">Simulation only. No transaction is made and no funds move.</p>
    {error ? <p className="card mt-6">Live rates unavailable right now.</p> : <div className="card mt-6 space-y-4">
      <label className="block">You pay<input className="input mt-1" inputMode="decimal" value={amt} onChange={e => setAmt(e.target.value)} /></label>{sel(a, setA, 'From')}
      <button className="mx-auto block" aria-label="Reverse" onClick={() => { setA(b); setB(a) }}><ArrowDownUp /></button>{sel(b, setB, 'To')}
      <p className="text-2xl font-bold text-white">≈ {out === null ? '…' : out.toLocaleString('en-US', { maximumFractionDigits: 6 })}</p>
      <p className="text-sm text-slate-400">Rate: 1 {a} = {pa && pb ? (pa / pb).toFixed(6) : '…'} {b}. Network fees depend on the chain and are not estimated here.</p></div>}</main>
}

function Contact() {
  useTitle('Contact'); const [err, setErr] = useState<Record<string, string>>({}); const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const x: Record<string, string> = {}
    if (String(f.get('name')).trim().length < 2) x.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(String(f.get('email')))) x.email = 'Enter a valid email address.'
    if (String(f.get('msg')).trim().length < 10) x.msg = 'Write at least 10 characters.'
    setErr(x); setSent(!Object.keys(x).length)
  }
  const F = (n: string, l: string, t = 'input') => <label className="block">{l}{t === 'ta' ? <textarea name={n} rows={5} className="input mt-1" aria-invalid={!!err[n]} /> : <input name={n} className="input mt-1" aria-invalid={!!err[n]} />}{err[n] && <span role="alert" className="text-sm text-pink-400">{err[n]}</span>}</label>
  return <main className="mx-auto max-w-xl px-5 py-14"><h1 className="text-4xl font-bold text-white">Contact UTC Wallet</h1>
    {sent ? <p className="card mt-6">Validated. Connect this form to an email or CRM endpoint to deliver messages; nothing was sent.</p> :
      <form onSubmit={submit} noValidate className="mt-6 space-y-4">{F('name', 'Name')}{F('email', 'Email')}{F('msg', 'Message', 'ta')}<button className="btn grad text-white">Send message</button></form>}</main>
}

function Login() {
  const [reg, setReg] = useState(new URLSearchParams(location.search).get('mode') === 'register'); useTitle(reg ? 'Register' : 'Log in')
  return <main className="mx-auto max-w-md px-5 py-14"><h1 className="text-4xl font-bold text-white">{reg ? 'Create account' : 'Log in'}</h1>
    <p className="mt-3 flex gap-2 text-sm"><ShieldCheck className="shrink-0 text-cyan" size={18} />UTC will never ask for your recovery phrase, private keys or exchange passwords.</p>
    <form className="card mt-6 space-y-4" onSubmit={e => e.preventDefault()}><input className="input" type="email" placeholder="Email" aria-label="Email" autoComplete="email" /><input className="input" type="password" placeholder="Password" aria-label="Password" autoComplete={reg ? 'new-password' : 'current-password'} />
      <button className="btn grad w-full text-white" disabled>{reg ? 'Create account' : 'Log in'} (backend not connected)</button>
      <button type="button" onClick={() => setReg(!reg)} className="text-sm text-cyan">{reg ? 'Have an account? Log in' : 'New to UTC? Register'}</button></form></main>
}

function InfoPage({ k }: { k: string }) {
  const p: Info = PAGES[k]; useTitle(p.title)
  return <main className="mx-auto max-w-6xl px-5 py-14"><h1 className="max-w-3xl text-4xl font-bold text-white md:text-5xl">{p.title}</h1><p className="mt-5 max-w-3xl text-lg text-slate-300">{p.intro}</p>
    <div className="mt-10 grid gap-5 md:grid-cols-3">{p.items.map(([t, d]) => <div key={t} className="card"><h2 className="font-bold text-white">{t}</h2><p className="mt-2 text-sm text-slate-400">{d}</p></div>)}</div>
    {p.note && <p className="mt-8 max-w-3xl rounded-xl border border-line p-4 text-sm text-slate-400">{p.note}</p>}</main>
}

export default function App() {
  return <><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Nav /><div id="main"><Routes>
    <Route path="/" element={<Home />} /><Route path="/markets" element={<Markets />} /><Route path="/swap" element={<Swap />} />
    <Route path="/contact" element={<Contact />} /><Route path="/login" element={<Login />} />
    {['about', 'wallet', 'buy', 'trading', 'staking', 'web3', 'security', 'news'].map(k => <Route key={k} path={'/' + k} element={<InfoPage k={k} />} />)}
    <Route path="*" element={<InfoPage k="about" />} /></Routes></div><Footer /></>
}

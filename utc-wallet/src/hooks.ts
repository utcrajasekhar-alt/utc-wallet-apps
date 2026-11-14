import { useEffect, useState } from 'react'
import { COIN_IDS } from './data'
export type Coin = { id: string; symbol: string; name: string; image: string; current_price: number; price_change_percentage_24h: number; market_cap: number; sparkline_in_7d: { price: number[] } }
export function useCoins() {
  const [coins, setCoins] = useState<Coin[]>([]); const [error, setError] = useState(false); const [loading, setLoading] = useState(true)
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(',')}&sparkline=true&price_change_percentage=24h`
    fetch(url).then(r => { if (!r.ok) throw new Error(); return r.json() }).then(setCoins).catch(() => setError(true)).finally(() => setLoading(false))
  }, [])
  return { coins, error, loading }
}
export function useTitle(t: string) { useEffect(() => { document.title = `${t} | UTC Wallet`; window.scrollTo(0, 0) }, [t]) }
export const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: n < 1 ? 4 : 2 })

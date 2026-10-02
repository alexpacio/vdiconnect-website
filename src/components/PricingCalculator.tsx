import { useMemo, useState } from 'react';
import './islands.css';

type Billing = 'monthly' | 'yearly';
type Country = 'IT' | 'EU' | 'XX';
type Method = 'card' | 'paypal';

interface Props {
  price: number;
  stripeMonthly: string;
  stripeYearly: string;
  paypalMonthly: string;
  paypalYearly: string;
}

const MIN = 1;
const MAX = 100;
const PRESETS = [1, 5, 10, 25, 50, 100];

const VAT_LABELS: Record<Country, string> = {
  IT: 'IVA 22% (Italy)',
  EU: 'VAT — reverse charge',
  XX: 'VAT — not applicable',
};

const eur = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(n);

function Check() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4B57" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function PricingCalculator({ price, stripeMonthly, stripeYearly, paypalMonthly, paypalYearly }: Props) {
  const [billing, setBilling] = useState<Billing>('monthly');
  const [count, setCount] = useState(10);
  const [country, setCountry] = useState<Country>('IT');
  const [method, setMethod] = useState<Method>('card');

  const clamp = (n: number) => Math.max(MIN, Math.min(MAX, Math.round(Number.isFinite(n) ? n : MIN)));

  const totals = useMemo(() => {
    const months = billing === 'yearly' ? 12 : 1;
    const subtotal = count * price * months;
    const vat = country === 'IT' ? subtotal * 0.22 : 0;
    return { subtotal, vat, total: subtotal + vat };
  }, [billing, count, country, price]);

  const checkoutUrl =
    method === 'card'
      ? billing === 'yearly' ? stripeYearly : stripeMonthly
      : billing === 'yearly' ? paypalYearly : paypalMonthly;

  const payLabel = method === 'card' ? `Pay ${eur(totals.total)} with card` : 'Continue to PayPal';

  return (
    <div className="calc">
      <div className="calc-steps">
        <section className="card calc-step" aria-labelledby="step-billing">
          <div className="calc-step-head">
            <h2 id="step-billing" className="calc-title"><span className="calc-num">01</span>Billing</h2>
            <span className="small muted">Same price per VDI either way</span>
          </div>
          <div className="segmented" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>Billed monthly</button>
            <button type="button" aria-pressed={billing === 'yearly'} onClick={() => setBilling('yearly')}>Billed yearly · one invoice</button>
          </div>
        </section>

        <section className="card calc-step" aria-labelledby="step-count">
          <h2 id="step-count" className="calc-title"><span className="calc-num">02</span>Number of VDIs</h2>
          <div className="row" style={{ gap: 20 }}>
            <div className="stepper">
              <button type="button" aria-label="Remove a VDI" onClick={() => setCount((c) => clamp(c - 1))}>−</button>
              <label htmlFor="vdi-count" className="sr-only">Number of VDIs</label>
              <input
                id="vdi-count"
                type="number"
                inputMode="numeric"
                min={MIN}
                max={MAX}
                value={count}
                onChange={(e) => setCount(clamp(Number(e.target.value)))}
              />
              <button type="button" aria-label="Add a VDI" onClick={() => setCount((c) => clamp(c + 1))}>+</button>
            </div>
            <div className="row" style={{ gap: 8 }} role="group" aria-label="Quick counts">
              {PRESETS.map((n) => (
                <button key={n} type="button" className="preset" aria-pressed={count === n} onClick={() => setCount(n)}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <p className="small muted" style={{ margin: 0 }}>
            License 1 to 100 VDIs online. Add more from your account at any time, or <a href="#enterprise" className="link-red">talk to sales</a> for larger estates.
          </p>
        </section>

        <section className="card calc-step" aria-labelledby="step-country">
          <h2 id="step-country" className="calc-title"><span className="calc-num">03</span>Billing country</h2>
          <div className="field" style={{ maxWidth: 360 }}>
            <label htmlFor="country">Country, for the VAT estimate</label>
            <select id="country" className="input" value={country} onChange={(e) => setCountry(e.target.value as Country)}>
              <option value="IT">Italy</option>
              <option value="EU">Another EU country (business with VAT number)</option>
              <option value="XX">Outside the EU</option>
            </select>
          </div>
          <p className="small muted" style={{ margin: 0 }}>
            Company name, VAT number{country === 'IT' ? ' and SDI code or PEC for the electronic invoice' : ''} are collected on the secure checkout page.
          </p>
        </section>

        <section className="card calc-step" aria-labelledby="step-method">
          <h2 id="step-method" className="calc-title"><span className="calc-num">04</span>Payment method</h2>
          <div className="grid" style={{ ['--min' as string]: '240px', gap: 12 }} role="radiogroup" aria-label="Payment method">
            <label className="method" data-selected={method === 'card'}>
              <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} />
              <span className="stack" style={{ ['--gap' as string]: '6px' }}>
                <strong>Card</strong>
                <span className="small muted">Visa, Mastercard, American Express</span>
                <span className="label">Processed by Stripe</span>
              </span>
            </label>
            <label className="method" data-selected={method === 'paypal'}>
              <input type="radio" name="method" value="paypal" checked={method === 'paypal'} onChange={() => setMethod('paypal')} />
              <span className="stack" style={{ ['--gap' as string]: '6px' }}>
                <strong>PayPal</strong>
                <span className="small muted">Pay with your PayPal balance or linked account</span>
                <span className="label">Approve in PayPal</span>
              </span>
            </label>
          </div>
          <p className="small muted" style={{ margin: 0 }}>Card details are entered on Stripe's secure page, never on vdiconnect.it.</p>
        </section>
      </div>

      <aside className="card card--panel calc-summary" aria-label="Order summary">
        <span className="label">Order summary</span>
        <div className="sum-line">
          <span className="stack" style={{ ['--gap' as string]: '4px' }}>
            <strong>VDIConnect VDI license</strong>
            <span className="small muted">
              {count} × {eur(price)} / month · {billing === 'yearly' ? 'billed yearly (12 months)' : 'billed monthly'}
            </span>
          </span>
          <span className="mono">{eur(totals.subtotal)}</span>
        </div>
        <div className="sum-line sum-line--rule">
          <span>{VAT_LABELS[country]}</span>
          <span className="mono">{eur(totals.vat)}</span>
        </div>
        <div className="sum-line sum-line--rule sum-total">
          <span>Total {billing === 'yearly' ? 'per year' : 'per month'}</span>
          <strong>{eur(totals.total)}</strong>
        </div>
        {checkoutUrl ? (
          <a className="btn btn--primary btn--block" href={checkoutUrl} rel="noopener">
            {payLabel}
          </a>
        ) : (
          <button className="btn btn--primary btn--block" type="button" disabled>
            {payLabel}
          </button>
        )}
        <p className="small muted" style={{ margin: 0, textAlign: 'center' }}>
          {checkoutUrl
            ? `You'll confirm ${count} VDI${count === 1 ? '' : 's'} on ${method === 'card' ? 'Stripe Checkout' : 'PayPal'}. VAT is calculated there.`
            : 'Online checkout is not configured yet.'}
        </p>
        <ul className="checks small">
          <li><Check />License key by e-mail, right after payment</li>
          <li><Check />Invoice with the correct VAT treatment</li>
          <li><Check />Change the number of VDIs from your account</li>
          <li><Check />No minimum order — start with one VDI</li>
        </ul>
      </aside>
    </div>
  );
}

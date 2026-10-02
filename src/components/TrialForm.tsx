import { useState, type SubmitEvent } from 'react';
import './islands.css';

interface Props {
  endpoint: string;
  salesEmail: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function TrialForm({ endpoint, salesEmail }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!endpoint) {
      setStatus('error');
      setMessage(`Online registration is not available yet. Please write to ${salesEmail} to request a trial.`);
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus('sent');
    } catch {
      setStatus('error');
      setMessage(`We couldn't send your registration. Please try again, or write to ${salesEmail}.`);
    }
  }

  if (status === 'sent') {
    return (
      <div className="stack" style={{ ['--gap' as string]: '18px' }} role="status">
        <span className="done-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </span>
        <h3 className="h3 h3--lg" style={{ fontSize: 28 }}>Thanks — check your inbox.</h3>
        <p style={{ margin: 0, color: 'var(--text-3)' }}>
          We'll e-mail the VDIConnect Server download link and your 30-day trial key to <strong style={{ color: '#fff' }}>{email}</strong>.
        </p>
        <div className="next-box">
          <span className="label">Next</span>
          <span>1 · Install the server on a Windows host</span>
          <span>2 · Enter the trial key in the server</span>
          <span>3 · Connect with the free client</span>
        </div>
        <a href="#clients" className="btn btn--primary btn--block">Download the free client</a>
        <button type="button" className="btn btn--block" onClick={() => { setStatus('idle'); setEmail(''); }}>
          Register another e-mail
        </button>
      </div>
    );
  }

  return (
    <form className="stack" style={{ ['--gap' as string]: '18px' }} method="post" action={endpoint || undefined} onSubmit={onSubmit} aria-labelledby="trial-form-title" noValidate>
      <div className="stack" style={{ ['--gap' as string]: '6px' }}>
        <h3 id="trial-form-title" className="h3 h3--lg">Register for the trial</h3>
        <p className="small muted" style={{ margin: 0 }}>Fields marked * are required.</p>
      </div>
      <input type="hidden" name="_subject" value="VDIConnect 30-day server trial request" />
      <input type="hidden" name="form" value="server-trial" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      <div className="grid" style={{ ['--min' as string]: '200px', gap: 14 }}>
        <div className="field">
          <label htmlFor="t-first">First name *</label>
          <input id="t-first" name="first_name" className="input" autoComplete="given-name" required />
        </div>
        <div className="field">
          <label htmlFor="t-last">Last name *</label>
          <input id="t-last" name="last_name" className="input" autoComplete="family-name" required />
        </div>
        <div className="field">
          <label htmlFor="t-email">Work e-mail *</label>
          <input id="t-email" name="email" type="email" className="input" autoComplete="email" placeholder="you@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="t-company">Company *</label>
          <input id="t-company" name="company" className="input" autoComplete="organization" required />
        </div>
        <div className="field">
          <label htmlFor="t-country">Country</label>
          <select id="t-country" name="country" className="input" autoComplete="country-name">
            <option>Italy</option>
            <option>Another EU country</option>
            <option>Outside the EU</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="t-size">VDIs you plan to test</label>
          <select id="t-size" name="vdis" className="input">
            <option>1–5</option>
            <option>6–20</option>
            <option>21–100</option>
            <option>More than 100</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="t-use">Main use case</label>
        <select id="t-use" name="use_case" className="input">
          <option>Engineering &amp; manufacturing</option>
          <option>Architecture &amp; construction</option>
          <option>Media &amp; post-production</option>
          <option>Finance &amp; trading</option>
          <option>Software &amp; game studios</option>
          <option>Contact centre</option>
          <option>Healthcare</option>
          <option>Other</option>
        </select>
      </div>
      <label className="check">
        <input type="checkbox" name="privacy_consent" value="yes" required />
        <span>I have read the <a href="/legal/privacy/" className="link-red">privacy notice</a> and agree that Netter srl processes my data to provide the trial and related support. *</span>
      </label>
      <label className="check">
        <input type="checkbox" name="marketing_consent" value="yes" />
        <span>Send me product news and offers. I can unsubscribe at any time.</span>
      </label>
      {status === 'error' && <p className="alert" role="alert">{message}</p>}
      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Get my 30-day trial'}
      </button>
      <p className="muted" style={{ margin: 0, fontSize: 12.5 }}>
        Registration is processed by a third-party form service on behalf of Netter srl. Your details are used only for the trial and, if you ask for it, product news.
      </p>
    </form>
  );
}

import { useState, type SubmitEvent } from 'react';
import './islands.css';

interface Props {
  endpoint: string;
}

export default function NotifyForm({ endpoint }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!endpoint) {
      setState('error');
      return;
    }
    setState('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      setState(response.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return <p className="small" role="status" style={{ margin: 0, color: 'var(--text-2)' }}>Thanks — we'll e-mail you when the Linux client ships.</p>;
  }

  return (
    <form className="stack" style={{ ['--gap' as string]: '8px' }} method="post" action={endpoint || undefined} onSubmit={onSubmit} noValidate>
      <input type="hidden" name="_subject" value="VDIConnect Linux client — notify me" />
      <input type="hidden" name="form" value="linux-notify" />
      <label htmlFor="linux-notify" className="small muted">Work e-mail</label>
      <div className="row" style={{ gap: 8 }}>
        <input id="linux-notify" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="input" style={{ flex: '1 1 160px', minWidth: 0, height: 52 }} />
        <button type="submit" className="btn" disabled={state === 'sending'}>Notify me</button>
      </div>
      {state === 'error' && <p className="alert" role="alert">We couldn't save your e-mail right now. Please try again later.</p>}
    </form>
  );
}

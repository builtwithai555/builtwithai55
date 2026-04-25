import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function EmailCapture({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    onSubmit(email);
  };

  return (
    <div className="card text-center">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <Mail size={48} color="var(--primary-color)" />
      </div>
      <h2 className="mb-4">Your Protocol is Ready!</h2>
      <p className="mb-6">
        Where should we send your personalized peptide recommendations?
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="input-field"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn-primary">
          See My Results <ArrowRight size={20} />
        </button>
      </form>
      <p style={{ fontSize: '0.85rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
        We respect your privacy. No spam, ever.
      </p>
    </div>
  );
}

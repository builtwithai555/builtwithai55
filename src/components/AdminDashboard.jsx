import { useState } from 'react';
import { Database, Lock, ArrowLeft } from 'lucide-react';

export default function AdminDashboard({ onBack }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/submissions', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (!response.ok) {
        throw new Error('Invalid password');
      }

      const result = await response.json();
      setData(result.data);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Unauthorized: Incorrect password.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="card text-center" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Lock size={48} color="var(--primary-color)" />
        </div>
        <h2 className="mb-4">Admin Access</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            className="input-field"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Verifying...' : 'View Submissions'}
          </button>
        </form>
        <button onClick={onBack} style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>
          Back to site
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Database size={28} color="var(--primary-color)" /> Database Submissions
        </h2>
        <button onClick={onBack} className="btn-outline" style={{ padding: '0.5rem 1rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Exit
        </button>
      </div>

      {data.length === 0 ? (
        <p className="text-center">No submissions found yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                <th style={{ padding: '1rem 0.5rem' }}>Email</th>
                <th style={{ padding: '1rem 0.5rem' }}>Goal</th>
                <th style={{ padding: '1rem 0.5rem' }}>Age</th>
                <th style={{ padding: '1rem 0.5rem' }}>Experience</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 0.5rem', whiteSpace: 'nowrap' }}>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>{row.email}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{row.answers?.goal || 'N/A'}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{row.answers?.age || 'N/A'}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{row.answers?.experience || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

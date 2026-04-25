import { ArrowRight, Activity } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="card text-center">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <Activity size={48} color="var(--primary-color)" />
      </div>
      <h1 className="mb-4">Discover Your Optimal Health Protocol</h1>
      <p className="mb-8">
        Take our quick 2-minute assessment to receive a personalized peptide and health protocol tailored to your unique goals.
      </p>
      <button className="btn-primary" onClick={onStart}>
        Start Assessment <ArrowRight size={20} />
      </button>
    </div>
  );
}

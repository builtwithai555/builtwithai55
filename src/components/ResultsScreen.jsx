import { CheckCircle, Calendar } from 'lucide-react';

export default function ResultsScreen({ answers }) {
  // Simple logic to determine a recommended peptide based on goals
  let recommendationTitle = "General Wellness Protocol";
  let recommendationDesc = "A balanced approach to optimizing your overall health and longevity.";
  let peptide = "BPC-157 & TB-500 Blend";

  const goal = answers.goal;
  
  if (goal === "Weight Loss & Metabolism") {
    recommendationTitle = "Metabolic Optimization Protocol";
    recommendationDesc = "Designed to enhance fat loss, improve insulin sensitivity, and boost energy levels.";
    peptide = "Semaglutide / Tirzepatide";
  } else if (goal === "Muscle Recovery & Growth") {
    recommendationTitle = "Performance & Recovery Protocol";
    recommendationDesc = "Formulated to accelerate tissue repair, build lean muscle, and reduce inflammation.";
    peptide = "CJC-1295 / Ipamorelin";
  } else if (goal === "Anti-Aging & Longevity") {
    recommendationTitle = "Longevity & Anti-Aging Protocol";
    recommendationDesc = "Focused on cellular repair, improved sleep quality, and restoring youthful vitality.";
    peptide = "Epitalon & NAD+";
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <CheckCircle size={56} color="var(--accent-color)" />
      </div>
      <h2 className="text-center mb-2">Your Personalized Plan</h2>
      <p className="text-center mb-8">Based on your answers, we've crafted the perfect protocol for you.</p>

      <div style={{ backgroundColor: 'var(--background-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
        <h3 className="mb-2" style={{ color: 'var(--primary-color)' }}>{recommendationTitle}</h3>
        <p className="mb-4">{recommendationDesc}</p>
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-color)' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Primary Recommendation:</strong>
          <span style={{ fontSize: '1.2rem', color: 'var(--accent-color)', fontWeight: '600' }}>{peptide}</span>
        </div>
      </div>

      <button className="btn-primary mb-4">
        <Calendar size={20} /> Schedule Your Consultation
      </button>
      <button className="btn-outline">
        Learn More About This Protocol
      </button>
    </div>
  );
}

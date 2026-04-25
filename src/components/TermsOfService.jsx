export default function TermsOfService({ onBack }) {
  return (
    <div className="card text-left" style={{ maxWidth: '800px' }}>
      <h1 className="mb-6 text-center">Terms of Service</h1>
      <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '1rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
        <p><strong>Last Updated: [Current Date]</strong></p>
        <p>Welcome to GetPeptides.com. By accessing or using our website and assessment, you agree to comply with and be bound by these Terms of Service.</p>
        <h3 className="mt-4 mb-2">1. Educational Purposes Only</h3>
        <p>The content, protocols, and recommendations provided by GetPeptides.com are for educational and informational purposes only. They do not constitute medical advice, diagnosis, or treatment.</p>
        <h3 className="mt-4 mb-2">2. User Responsibilities</h3>
        <p>You agree to consult with a licensed healthcare professional before beginning any new health regimen or peptide therapy discussed on this site.</p>
        <h3 className="mt-4 mb-2">3. Limitation of Liability</h3>
        <p>GetPeptides.com shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or recommendations.</p>
        <h3 className="mt-4 mb-2">4. Modifications</h3>
        <p>We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the site constitutes acceptance of the modified terms.</p>
      </div>
      <div className="mt-8 text-center">
        <button className="btn-outline" onClick={onBack}>
          Return to Assessment
        </button>
      </div>
    </div>
  );
}

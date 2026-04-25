export default function PrivacyPolicy({ onBack }) {
  return (
    <div className="card text-left" style={{ maxWidth: '800px' }}>
      <h1 className="mb-6 text-center">Privacy Policy</h1>
      <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '1rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
        <p><strong>Last Updated: [Current Date]</strong></p>
        <p>Welcome to GetPeptides.com. We value your privacy and are committed to protecting your personal information.</p>
        <h3 className="mt-4 mb-2">1. Information We Collect</h3>
        <p>We may collect personal information such as your name, email address, and health goals when you voluntarily provide it through our assessment.</p>
        <h3 className="mt-4 mb-2">2. How We Use Your Information</h3>
        <p>Your information is used strictly to provide personalized health protocol recommendations and to communicate with you regarding our services. We do not sell your data to third parties.</p>
        <h3 className="mt-4 mb-2">3. Data Security</h3>
        <p>We implement standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</p>
        <h3 className="mt-4 mb-2">4. Your Rights</h3>
        <p>You have the right to access, update, or delete your personal information at any time by contacting us.</p>
      </div>
      <div className="mt-8 text-center">
        <button className="btn-outline" onClick={onBack}>
          Return to Assessment
        </button>
      </div>
    </div>
  );
}

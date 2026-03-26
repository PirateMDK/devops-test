'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<string>('Connecting to backend...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/status`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to connect');
        return res.json();
      })
      .then((data) => setStatus(data.message))
      .catch((err) => {
        console.error(err);
        setError('Could not connect to the backend. Is it running?');
        setStatus('Connection failed');
      });
  }, []);

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h1 style={styles.title}>DevOps Test Project</h1>
        <div style={{ ...styles.statusBox, borderColor: error ? '#ef4444' : '#22c55e', backgroundColor: error ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)' }}>
          <h2 style={styles.statusTitle}>Backend Status:</h2>
          <p style={{ ...styles.statusText, color: error ? '#f87171' : '#4ade80' }}>{status}</p>
        </div>
        {error && (
          <div style={styles.errorBox}>
            <p>{error}</p>
            <p style={styles.errorDetail}>Expected API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/status'}</p>
          </div>
        )}
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={{ ...styles.cardTitle, color: '#60a5fa' }}>Frontend Folder</h3>
            <p style={styles.cardText}>Next.js 16+ App Router, TypeScript.</p>
          </div>
          <div style={styles.card}>
            <h3 style={{ ...styles.cardTitle, color: '#4ade80' }}>Backend Folder</h3>
            <p style={styles.cardText}>Node.js Express server with CORS enabled.</p>
          </div>
        </div>
      </main>
      <footer style={styles.footer}>DevOps Candidate Evaluation Environment</footer>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', backgroundColor: '#0f172a', color: 'white', fontFamily: 'var(--font-geist-sans)' },
  main: { display: 'flex', flexDirection: 'column' as const, gap: '2rem', alignItems: 'center', textAlign: 'center' as const },
  title: { fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' },
  statusBox: { padding: '1.5rem', borderRadius: '0.75rem', border: '2px solid', transition: 'all 0.5s' },
  statusTitle: { fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.5rem' },
  statusText: { fontSize: '1.5rem', fontWeight: 'bold' },
  errorBox: { marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(234,179,8,0.2)', border: '1px solid #eab308', borderRadius: '0.5rem', color: '#fef08a', maxWidth: '28rem' },
  errorDetail: { fontSize: '0.875rem', marginTop: '0.5rem', fontFamily: 'monospace' },
  grid: { marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', textAlign: 'left' as const, maxWidth: '42rem' },
  card: { padding: '1rem', borderRadius: '0.5rem', backgroundColor: '#1e293b', border: '1px solid #334155' },
  cardTitle: { fontWeight: 'bold', marginBottom: '0.5rem' },
  cardText: { fontSize: '0.875rem', color: '#cbd5e1' },
  footer: { marginTop: '5rem', color: '#64748b', fontSize: '0.875rem', fontStyle: 'italic' }
};

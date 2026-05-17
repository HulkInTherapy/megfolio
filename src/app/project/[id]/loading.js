export default function ProjectLoading() {
  return (
    <div className="site-container">
      <main>
        <section className="container">
          <div style={{ opacity: 0.4 }}>
            <div style={{ width: '120px', height: '16px', background: 'var(--pencil)', borderRadius: '4px', marginBottom: '24px' }} />
            <div style={{ width: '50%', height: '32px', background: 'var(--pencil)', borderRadius: '4px', marginBottom: '16px' }} />
            <div style={{ width: '100%', height: '2px', background: 'var(--pencil)', marginBottom: '16px' }} />
            <div style={{ width: '70%', height: '20px', background: 'var(--spark)', borderRadius: '4px', marginBottom: '48px', opacity: 0.3 }} />
            <div style={{ width: '100%', height: '200px', background: 'var(--paper-aged)', borderRadius: '4px', marginBottom: '32px' }} />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[80, 60, 100, 70, 50].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: '28px', background: 'var(--pencil)', borderRadius: '4px', opacity: 0.2 }} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

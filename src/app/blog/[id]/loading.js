export default function BlogLoading() {
  return (
    <div className="site-container">
      <main>
        <div className="container" style={{ paddingTop: '70px' }}>
          <div style={{ opacity: 0.4 }}>
            <div style={{ width: '140px', height: '16px', background: 'var(--pencil)', borderRadius: '4px', marginBottom: '12px' }} />
            <div style={{ width: '70%', height: '32px', background: 'var(--pencil)', borderRadius: '4px', marginBottom: '16px' }} />
            <div style={{ width: '100%', height: '2px', background: 'var(--pencil)', marginBottom: '32px' }} />
            <div style={{ width: '100%', height: '80px', background: 'var(--paper-aged)', borderRadius: '4px', marginBottom: '24px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '100%', height: '14px', background: 'var(--pencil)', borderRadius: '2px', opacity: 0.3 }} />
              <div style={{ width: '90%', height: '14px', background: 'var(--pencil)', borderRadius: '2px', opacity: 0.3 }} />
              <div style={{ width: '95%', height: '14px', background: 'var(--pencil)', borderRadius: '2px', opacity: 0.3 }} />
              <div style={{ width: '60%', height: '14px', background: 'var(--pencil)', borderRadius: '2px', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

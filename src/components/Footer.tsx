export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '24px',
        marginTop: '48px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'JoseonGulim, sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '-0.02em',
          color: 'var(--color-text-sub)',
        }}
      >
        @stack.qq
      </span>
    </footer>
  );
}

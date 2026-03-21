export const metadata = {
  title: 'CoLAB — Regulatory Intelligence',
  description: 'Global pharmaceutical regulatory submission intelligence. 128+ countries, AI document review, ICH M4Q(R2) ready.',
  keywords: 'regulatory affairs, CTD, ACTD, ASEAN, pharmaceutical, drug registration, ICH',
  openGraph: {
    title: 'CoLAB — Regulatory Intelligence',
    description: 'Global pharmaceutical regulatory submission intelligence. 128+ countries, ASEAN ACTD, ICH M4Q(R2).',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#F0F0F0' }}>
        {children}
      </body>
    </html>
  );
}

import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  header: { borderBottom: '2pt solid #B8860B', marginBottom: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  brandName: { color: '#0F172A', fontSize: 24, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chartBox: { width: '45%', height: 200, border: '1pt solid #E2E8F0', marginBottom: 10 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTop: '1pt solid #E2E8F0', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  link: { color: '#B8860B', fontSize: 10 }
});

export const KundliPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.brandName}>{data.profile.name || 'Vedic Consultant'}</Text>
        {data.profile.logo && <Image src={data.profile.logo} style={{ width: 50 }} />}
      </View>
      <View style={styles.grid}>
         {Object.entries(data.charts).slice(0, 2).map(([key, url]) => (
           url ? <Image key={key} src={url as string} style={styles.chartBox} /> : null
         ))}
      </View>
      <View style={styles.footer}>
        <Link src={`https://wa.me/${data.profile.whatsapp}`} style={styles.link}>WhatsApp</Link>
        <Link src={data.profile.instagram} style={styles.link}>Instagram</Link>
      </View>
    </Page>
  </Document>
);

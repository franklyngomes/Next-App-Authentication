"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../../../theme/AppTheme';
import AppBar from '../../components/AppBar';
import List from '@/app/components/List';
import Footer from '../../components/Footer';

export default function Blog(props: { disableCustomTheme?: boolean }) {
  const [isClient, setIsClient] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsClient(true)
  },[])

  if(!isClient){
    return null
  }
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <List />
      </Container>
      <Footer />
    </AppTheme>
  );
}
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import Routes from '../../routes';

export default function Layout() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  )
}
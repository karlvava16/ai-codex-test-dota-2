import { useEffect, useState } from 'react';

import { ShellLayout } from '@/components/templates';
import { HeroesPage } from '@/pages/HeroesPage';
import { ItemsPage } from '@/pages/ItemsPage';

type AppPage = 'heroes' | 'items';

function parsePageFromHash(hash: string): AppPage {
  const normalized = hash.replace(/^#/, '').trim().toLowerCase();

  if (normalized === 'items' || normalized === 'stash-items') {
    return 'items';
  }

  return 'heroes';
}

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    typeof window === 'undefined' ? 'heroes' : parsePageFromHash(window.location.hash),
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(parsePageFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'heroes' ? '#heroes' : '#stash-items';
  };

  return (
    <ShellLayout currentPage={currentPage} onNavigate={handleNavigate}>
      {currentPage === 'items' ? <ItemsPage /> : <HeroesPage />}
    </ShellLayout>
  );
}

export default App;

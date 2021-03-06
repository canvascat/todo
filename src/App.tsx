import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, CurrentProjectProvider } from './context';

import styles from '@/styles/header.module.scss';

type AppProps = {
  darkModeDefault?: boolean;
};

export const App: React.FC<AppProps> = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <CurrentProjectProvider>
      <ProjectsProvider>
        <main className={darkMode ? styles.darkmode : undefined}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </CurrentProjectProvider>
  );
};

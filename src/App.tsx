import React from 'react';
import { Layout } from './components/Layout';
import { Welcome } from './components/Welcome';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, loading, init } = useAuthStore();
  
  // Add debugging logs
  console.log('Auth State:', { user, loading });
  
  React.useEffect(() => {
    console.log('Setting up auth listener');
    const unsubscribe = init();
    return () => {
      console.log('Cleaning up auth listener');
      unsubscribe();
    }
  }, [init]);

  if (loading) {
    return <div>Loading...</div>; // Add loading state
  }

  return (
    <Layout>
      <Welcome user={user} />
    </Layout>
  );
}

export default App;
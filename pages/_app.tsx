import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { useApollo } from '@src/lib/apollo-client';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <div style={{ margin: '20px' }}>
        <Component {...pageProps} />
      </div>
      <footer>
        <a
          href="https://github.com/greatSumini"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by greatSumini
        </a>
      </footer>
    </ApolloProvider>
  );
}

export default App;

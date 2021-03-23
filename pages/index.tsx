import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextjs Apollo Playground</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>
          Welcome to <a>Playground!</a>
        </h1>

        <p>Learn more</p>
        <ol>
          <li>
            <a href="https://nextjs.org">Next.js</a>
          </li>
          <li>
            <a href="https://www.apollographql.com/docs/react/">
              Apollo Client (React)
            </a>
          </li>
        </ol>
      </main>

      <footer>
        <a
          href="https://github.com/greatSumini"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by greatSumini
        </a>
      </footer>
    </div>
  );
}

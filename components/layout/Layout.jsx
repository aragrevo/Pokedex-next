import Head from 'next/head';
export function Layout({children}) {
  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta name='description' content='Crud from custom pokemon api' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='min-h-screen bg-slate-100'>
        <nav>
          <ul>
            <li>HOla</li>
          </ul>
        </nav>
        {children}
      </main>
    </>
  );
}

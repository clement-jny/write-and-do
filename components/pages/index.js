import Head from 'next/head';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Write and DO</title>
                <meta name="description" content="Gestionnaire de tâches" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Bienvenue sur Write and DO</h1>
                <p>Votre gestionnaire de tâches.</p>
            </main>
        </div>
    );
}

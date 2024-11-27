import Head from 'next/head';
import SignupForm from '../../components/forms/SignupForm';
import './globals.css';
import FAQPage from '../../components/FAQ';

const HomePage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Write and DO</title>
                <meta name="description" content="Gestionnaire de tâches" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Bienvenue sur Write and DO</h1>
                <h1>Sign Up</h1>
                <FAQPage />
            </main>
        </div>
    );
}

export default HomePage;

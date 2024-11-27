import Head from 'next/head';
import SignupForm from '../../components/pages/signup.js';
// import styles from './page.module.css';

const HomePage = () => {
    return (
        <div>
            <Head>
                <title>Write and DO</title>
                <meta name="description" content="Gestionnaire de tâches" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>
                    Bienvenue sur Write and DO
                </h1>
                <h1>Sign Up</h1> 
                <SignupForm />
            </main>
        </div>
    );
}

export default HomePage;

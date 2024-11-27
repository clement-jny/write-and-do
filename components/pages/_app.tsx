// import Navbar from '../components/Navbar';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function WriteAndDo({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* <Navbar /> */}
            <Component {...pageProps} />
        </>
    );
}

export default WriteAndDo;

import Navbar from '../components/Navbar';
import '../styles/globals.css';

function WriteAndDo({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

export default WriteAndDo;

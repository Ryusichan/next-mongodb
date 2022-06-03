import Head from "next/head";
// import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
// import { useEffect } from "react";

function MyApp({ Component, pageProps }: any) {
  //   useEffect(()=>{
  //     import("bootstrap/dist/js/bootstrap");
  // },[])

  return (
    <>
      <Head>
        {/* // Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* // bootstrap CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

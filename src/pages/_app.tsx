import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
//import analytics from "~/utils/analytics";
import Intercom from "react-intercom";
import { useEffect } from "react";
import { useRouter } from "next/router";

// analytics.on("page", () => {
//   console.log("Page");
// });
// process.on('unhandledRejection', () => {});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const showIntercom = ["/", "/start", "/dashboard"].includes(router.pathname);

  return (
    <SessionProvider session={session}>
      <Head>
        {/* <meta 
           http-equiv="Content-Security-Policy"
           content="script-src 'unsafe-eval';"
         />  */}
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      {showIntercom && <Intercom appID="g9d1y1bz" />}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

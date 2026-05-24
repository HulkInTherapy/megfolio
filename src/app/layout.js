import "@/index.css";
import "@/App.css";
import Script from "next/script";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientShell from "@/components/interactive/ClientShell";
import { Caveat, Syne, Inter } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

const SITE_URL = "https://meghavi.me";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meghavi Rao | Applied AI Engineer — Portfolio & Blog",
    template: "%s | Meghavi Rao",
  },
  description:
    "Meghavi Rao is a male Applied AI Engineer building production ML systems, LLM applications, and intelligent search. He writes about shipping AI to production, embeddings, and ML debugging.",
  keywords: [
    "Meghavi Rao",
    "Meghavi",
    "Applied AI Engineer",
    "Machine Learning Engineer",
    "LLM",
    "AI portfolio",
    "ML engineer portfolio",
    "meghavi.me",
  ],
  authors: [{ name: "Meghavi Rao", url: SITE_URL }],
  creator: "Meghavi Rao",
  publisher: "Meghavi Rao",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Meghavi Rao",
    title: "Meghavi Rao | Applied AI Engineer",
    description:
      "Meghavi Rao is an Applied AI Engineer building production ML systems, LLM apps, and semantic search. Explore his projects and blog.",
  },
  twitter: {
    card: "summary",
    site: "@meghavi",
    creator: "@meghavi",
    title: "Meghavi Rao | Applied AI Engineer",
    description:
      "Meghavi Rao — Applied AI Engineer. Projects, blog posts, and experiments in AI/ML.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  manifest: "/manifest.json",
  verification: {},
};

export const viewport = {
  themeColor: "#FDFBF7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${caveat.variable} ${syne.variable} ${inter.variable}`}>
      <body>
        <div className="App">
          <div
            className="texture-overlay"
            style={{ backgroundImage: "url(/bg/texture.jpg)" }}
            aria-hidden="true"
          />
          <ErrorBoundary>
            <ClientShell>{children}</ClientShell>
          </ErrorBoundary>
        </div>

        <Script
          src="https://assets.emergent.sh/scripts/emergent-main.js"
          strategy="lazyOnload"
        />
        <Script id="posthog-init" strategy="lazyOnload">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?(u=e[a]=[]):a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])}),e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_yJW1VjHGGwmCbbrtczfqqNxgBDbhlhOWcdzcIJEOTFE',{api_host:'https://us.i.posthog.com',person_profiles:'identified_only'});
          `}
        </Script>
      </body>
    </html>
  );
}

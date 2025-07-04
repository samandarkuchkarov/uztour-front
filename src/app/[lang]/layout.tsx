import { i18n, type Locale } from "../../i18n-config";
import Header from "../../components/Header";
import InitialLogic from "../../components/InitialLogic";
import "../globals.css";
import Footer from "../../components/Footer";
import { Suspense } from "react";
const metadataByLocale: Record<Locale, { title: string; description: string }> =
  {
    ru: {
      title: "Экскурсии по Узбекистану с UzTours",
      description:
        "Откройте для себя Узбекистан с нашими однодневными турами — Самарканд, Бухара, Хива и другие города ждут вас. Уникальные маршруты, профессиональные гиды и незабываемые впечатления!",
    },
    en: {
      title: "Explore Uzbekistan with UzTours",
      description:
        "Discover the beauty of Uzbekistan on our day tours — from Samarkand to Bukhara and beyond. Unique routes, expert guides, and unforgettable experiences await!",
    },
    uz: {
      title: "UzTours bilan O‘zbekiston bo‘ylab sayohatlar",
      description:
        "Bir kunlik sayohatlar orqali O‘zbekistonning go‘zalliklarini kashf eting — Samarqand, Buxoro, Xiva va boshqa shaharlarga sayohatlar. Maxsus yo‘nalishlar, professional gidlar va unutilmas taassurotlar!",
    },
  };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  return metadataByLocale[lang] || metadataByLocale["en"];
}
type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};
export default async function Root(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
  searchParams: SearchParamProps;
}) {
  const params = await props.params;
  const { children } = props;
  return (
    <html>
      <body>
        <InitialLogic />
        <Suspense>
          <Header lang={params.lang} />
        </Suspense>

        {children}
        <Footer />
      </body>
    </html>
  );
}

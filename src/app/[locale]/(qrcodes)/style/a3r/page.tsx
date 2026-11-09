import { QrcodePlaceholder } from "@/components/QrcodePlaceholder";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <QrcodePlaceholder />;
}

import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import EditorPage from "./EditorPage";

export default function Page() {
  return (
    <EditorPage />
  );
}

export const metadata = metadataGenerator({
  title: "Write"
})
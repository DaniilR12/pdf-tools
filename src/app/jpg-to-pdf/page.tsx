import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";

export default function JpgToPdfPage() {
  return (
    <ToolWorkspace
      apiEndpoint="/api/jpg-to-pdf"
      title="JPG to PDF"
      description="Bring your images together in one polished PDF, ready to share."
      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
      acceptedLabel="JPG or PNG images up to 25 MB"
      accent="coral"
    />
  );
}

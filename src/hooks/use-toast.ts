type Toast = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const toast = ({ title, description }: Toast) => {
    alert(
      `${title ? title + "\n" : ""}${description ? description : ""}`
    );
  };

  return { toast };
}
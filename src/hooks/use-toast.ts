type Toast = {
  title?: string;
  description?: string;
};

export function useToast() {
  const toast = ({ title, description }: Toast) => {
    alert(
      `${title ? title + "\n" : ""}${description ? description : ""}`
    );
  };

  return { toast };
}
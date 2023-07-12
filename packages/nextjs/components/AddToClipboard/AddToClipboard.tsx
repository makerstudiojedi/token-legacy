import { toast } from "../ui/use-toast";
import styles from "./AddToClipboard.module.scss";
import { cn } from "~~/lib/utils";

interface AddToClipboardProps {
  className?: string;
  children: React.ReactNode;
  copiedText: string;
  text: string;
}

const AddToClipboard: React.FC<AddToClipboardProps> = ({ children, className, copiedText, text }): JSX.Element => {
  const addToClipboardClasses = cn(styles.AddToClipboard, className);

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(text);

      toast({
        variant: "default",
        description: copiedText,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again.",
      });
    }
  };

  return (
    <span className={addToClipboardClasses} onClick={copyHandler}>
      {children}
    </span>
  );
};

export default AddToClipboard;

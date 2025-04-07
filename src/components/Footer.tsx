
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-4 px-4 mt-6 border-t text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
        <p>© {currentYear} Study Buddy. All rights reserved.</p>
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-destructive fill-destructive" />
          <span>by Lovable</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

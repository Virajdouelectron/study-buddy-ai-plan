
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-4 px-4 mt-6 border-t text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex justify-center">
        <p>© {currentYear} Study Buddy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

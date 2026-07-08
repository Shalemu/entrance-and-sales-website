import { BookingCartProvider } from "@/context/BookingCartContext";
import "../app/css/euclid-circular-a-font.css";
import "../app/css/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BookingCartProvider>
        {children}
        </BookingCartProvider>
        </body>
    </html>
  );
}
import { BookingCartProvider } from "@/context/BookingCartContext";
import "../app/css/euclid-circular-a-font.css";
import "../app/css/style.css";
import { Toaster } from "sonner";
import { LoadingProvider } from "@/context/LoadingContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
        <BookingCartProvider>
          {children}

          <Toaster
            position="top-right"
            richColors
            // closeButton
            expand={true}
            duration={6000}
            toastOptions={{
              classNames: {
                toast:
                  "rounded-2xl shadow-xl border bg-white px-5 py-4",
                title:
                  "text-sm font-semibold text-gray-900",
                description:
                  "text-sm text-gray-500 mt-1",
              },
            }}
          />

        </BookingCartProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
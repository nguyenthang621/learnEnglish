import Footer from "@/components/Footer/Footer";
import { ReduxProvider } from "@/stores/ReduxProvider";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
     <ReduxProvider>
        {children}
        {/* <Footer /> */}
    </ReduxProvider>
    </div>
  );
}

export default AuthLayout;

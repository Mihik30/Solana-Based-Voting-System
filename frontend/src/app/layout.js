// import "frontend/src/app/globals.css";
import ConnectWallet from "/root/blockchain/voting-system/frontend/src/app/components/ConnectWallet.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <ConnectWallet />
        {children}
      </body>
    </html>
  );
}

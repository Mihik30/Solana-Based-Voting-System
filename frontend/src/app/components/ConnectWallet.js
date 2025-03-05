import { useWallet, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ConnectWallet() {
  return (
    <div className="p-4 flex justify-end">
      <WalletMultiButton />
    </div>
  );
}

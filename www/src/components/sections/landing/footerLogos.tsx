// src/app/FooterLogos.tsx

import GitHubAsset from '@/components/media/CDNapi';

type FooterLogo = {
  href: string;
  repo: string;
  path: string;
  assetType: 'image';
};

interface FooterLogosProps {
  logos: FooterLogo[];
}

const FooterLogos: React.FC<FooterLogosProps> = ({ logos }) => {
  return (
    <div className="flex justify-center space-x-4 my-8">
      {logos.map((logo, index) => (
        <a key={index} href={logo.href} target="_blank" rel="noopener noreferrer">
          <GitHubAsset repo={logo.repo} path={logo.path} assetType={logo.assetType} />
        </a>
      ))}
    </div>
  );
};

export default FooterLogos;
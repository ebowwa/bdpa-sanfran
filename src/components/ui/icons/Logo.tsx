import GoldsencoLogoSVG from "./goldson_logo.svg";

interface GoldsencoLogoProps {
  // Add any additional props if needed
}

const GoldsencoLogo: React.FC<GoldsencoLogoProps> = ({ ...props }) => {
  return <GoldsencoLogoSVG {...props} />;
};

export default GoldsencoLogo;
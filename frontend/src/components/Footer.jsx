import SocialMedia from './SocialMedia';
const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center  mt-32 p-6 shadow-2xl container rounded-lg mx-auto">
      <SocialMedia />
      <p className="mt-2">
        © 2024 - All Rights Reserved with ❤️ 🫶 by Z.Mthombe
      </p>
    </footer>
  );
};

export default Footer;

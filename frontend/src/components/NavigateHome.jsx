import Links from './Links';

const NavigateHome = () => {
  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <Links to={'/apply'} text={'Sell on SellSpot'} />
        <Links to={'/list'} text={'List'} />
        <Links to={'/cart'} text={'Cart'} />
      </ul>
    </>
  );
};

export default NavigateHome;

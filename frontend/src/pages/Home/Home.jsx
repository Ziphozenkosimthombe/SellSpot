import HeaderHome from '../../components/Home/HeaderHome';
import AllProductList from '../../components/AllProducts.jsx';
const Home = () => {
  return (
    <>
      <HeaderHome />
      <div className="mt-24">
        <AllProductList />
      </div>
    </>
  );
};

export default Home;

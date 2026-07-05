 import Header from "../common/header";
  import Footer from "../common/footer";
  import Hero from "./hero";
  import GenderSection from "../product/gendercollection";
  import NewArrival from "../product/newarrivel";
  import BestSeller from "../product/bestseller";
  import YouMayAlsoLike from "../product/youmaylike";
  import Featurecollection from "../product/featurecollection";

  function UserLayout() {
    return (
      <>
        <Header />
        <Hero/>
        <GenderSection/>
        <NewArrival/>
        <BestSeller/>
        <YouMayAlsoLike/>
        <Featurecollection/>

        <Footer/>
      
      </>
    );
  }

  export default UserLayout;
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
/* eslint-disable react/prop-types */
const DefaultLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default DefaultLayout;

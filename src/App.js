import ApplicationRoutes from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation'
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<>
			<Router>
				<Navigation />
				<ApplicationRoutes />
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;

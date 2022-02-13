import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import PrivateRoute from '../components/PrivateRoute';
import Jobs from '../components/Jobs';
import SingleJob from '../components/SingleJob';
import NotFound from '../components/NotFound';
import AddJob from '../components/AddJob';

const ApplicationRoutes = () => {

    return (

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/jobs/:id' element={<SingleJob />} />

            <Route path='/profile' element={
                <PrivateRoute redirect='/profile'>
                    <Profile />
                </PrivateRoute>
            } />
            <Route path='/profile/jobs' element={
                <PrivateRoute redirect='/profile/jobs'>
                    <AddJob />
                </PrivateRoute>
            } />

            <Route path='*' element={<NotFound />} />
        </Routes>

    )

}
export default ApplicationRoutes;
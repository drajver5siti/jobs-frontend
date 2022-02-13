import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/auth";


const Profile = () => {
    const { userID } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        // getUserInfo(user)
        // user is the id of the user
    }, [])
    return (
        <>
            <div>
                <p>ID: {userID}</p>
                <button className='bg-dark-color px-4 py-2 text-white font-semibold rounded-md' onClick={() => navigate('/profile/jobs')}>My jobs</button>
            </div>
        </>
    )
}

export default Profile;
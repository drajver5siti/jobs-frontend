import { useUserContext } from "../context/auth";


const Profile = () => {
    const { logOutProvider } = useUserContext();
    const { user } = useUserContext();
    return (
        <div>
            <p>Username: {user?.username}</p>
            <p>ID: {user?.id}</p>
        </div>
    )
}

export default Profile;
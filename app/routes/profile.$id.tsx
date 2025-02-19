import {findUser, User} from "../../users";
import {redirect, useLoaderData} from "@remix-run/react";

export const loader = async ({params}: {params: {id: string}}) => {
    const user = findUser(params.id);

    if (!user) {
        return redirect(`/`);
    }

    return new Response(JSON.stringify(user), {headers: {'Content-Type': 'application/json'}});
}

const Profile = () => {
    const user = useLoaderData<User>();

    return (
        <div>
            <div>
                <h1>Welcome {user.name}</h1>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
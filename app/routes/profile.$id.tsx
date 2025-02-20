import {deleteUser, findUser, User} from "../../users";
import {Form, redirect, useLoaderData} from "@remix-run/react";
import {format} from "pathe";

export const loader = async ({params}: {params: {id: string}}) => {
    const user = findUser(params.id);

    if (!user) {
        return redirect(`/`);
    }

    return new Response(JSON.stringify(user), {headers: {'Content-Type': 'application/json'}});
}

export const action = async ({params, request}: {params: {id: string}, request: Request}) => {
    const formData = await request.formData();
    const actionType = formData.get("action");

    if (actionType === "logout") {
        return redirect("/");
    }

    if (actionType === "delete") {
        deleteUser(params.id);
        return redirect("/");
    }
}

const Profile = () => {
    const user = useLoaderData<User>();

    const handleClientSideAction = (action: string) => {
        if (action === "logout" || action === "delete") {
            localStorage.removeItem("userLogged");
        }
    }

    return (
        <div>
            <div>
                <h1>Welcome {user.name}</h1>
                <p>Email: {user.email}</p>
                <div className="flex gap-4">
                    <Form method="POST" onSubmit={()=>handleClientSideAction("logout")}>
                        <input type="hidden" name="action" value="logout"/>
                        <button className="px-3 py-1 bg-blue-600" type="submit">Logout</button>
                    </Form>
                    <Form method="POST" onSubmit={()=>handleClientSideAction("delete")}>
                        <input type="hidden" name="action" value="delete"/>
                        <button className="px-3 py-1 bg-red-600" type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
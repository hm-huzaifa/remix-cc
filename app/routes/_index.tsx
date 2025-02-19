import type { MetaFunction } from "@remix-run/node";
import {Form, useActionData, useNavigate, useNavigation} from "@remix-run/react";
import {v4 as uuidv4} from "uuid";
import {addUser, findUserByEmailPassword, User} from "../../users";
import {useEffect} from "react";

type ActionData = {
  error?: string;
  user?: User;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({request}: {request: Request}) => {
  const formData = await request.formData();
  console.log("formData: ", formData);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return Response.json(
      {error: "Email and Password are required"},
      {status: 400}
    )
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  }

  const existingUser = findUserByEmailPassword(email, password);

  const user = existingUser || newUser;

  if (!existingUser) {
    addUser(newUser);
  }

  return Response.json({user}, {status: 200});

}

export default function Index() {
  const actionData = useActionData<ActionData>()
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogged");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      location.pathname = `/profile/${user.id}`
    }

    if (actionData?.user) {
      localStorage.setItem("userLogged", JSON.stringify(actionData.user));
      navigate(`/profile/${actionData.user.id}`)
    }
  }, [actionData, navigate]);

  return (
      <div className="">
        <div>
          <h1>Login</h1>

          <Form method="POST">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name"/>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email"/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password"/>
            </div>
            <button type="submit">
              Login
            </button>
          </Form>
        </div>
      </div>
  );
}
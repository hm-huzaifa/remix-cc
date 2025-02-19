export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const users: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "pass1234",
    },
    {
        id: "2",
        name: "Danny Bravo",
        email: "danbravo@example.com",
        password: "pass1234",
    },
    {
        id: "3",
        name: "DB Cooper",
        email: "cooperdb@example.com",
        password: "pass1234",
    }
];

export const addUser = (user: User) => {
    const existingUser = findUserByEmailPassword(user.email, user.password);

    if (!existingUser) {
        users.push(user)
    }
}

export const findUser = (id: string) => {
    return users.find((user) => user.id === id);
}

export const findUserByEmailPassword = (email: string, password: string) => {
    return users.find(
        (u) => u.email === email && u.password === password,
    )
}

export const deleteUser = (id: string) => {}
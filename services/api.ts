export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
}

export async function getUsers(): Promise<User[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

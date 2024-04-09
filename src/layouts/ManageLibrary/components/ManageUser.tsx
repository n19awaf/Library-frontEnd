import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import UserModel from "../../../models/UserModel";


export const ManageUser: React.FC  = () => {

    const {authState} = useOktaAuth();
    const [user, setUser] = useState<UserModel[]>([]);

    useEffect(() => {
        fetchUsers();

    },[authState]);

    const fetchUsers = async () => {
        if (authState && authState.isAuthenticated) {
            try {
                const url = `${process.env.REACT_APP_API}/secure/users`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    };

        const deleteUser = async (id: number) => {
            try {
                const url = `${process.env.REACT_APP_API}/secure/user/${id}`;
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                // Remove the deleted user from the state
                setUser(prevUsers => prevUsers.filter(user => user.id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };
    

    return(
        <div className='container'>
            <div className='py-4'>
            <table className="table border shadow">
                <thead className='border-dark'>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col"> First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((user,index) => (
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </div>
    );
}

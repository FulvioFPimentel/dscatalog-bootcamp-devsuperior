import { Route, Switch } from 'react-router-dom'; 
import List from './List';
import './styles.scss'

const Users = () => {
    return (
        <Switch>
            <Route path='/admin/users' exact>
                <List />
            </Route>
            <Route path='/admin/users/:usersId'>
                <h1>Users Id</h1>
            </Route>
        </Switch>
    )

}

export default Users;
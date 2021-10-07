import { Route, Switch } from 'react-router-dom'; 
import Form from './Form';
import List from './List';
import './styles.scss'

const Users = () => {
    return (
        <Switch>
            <Route path='/admin/users' exact>
                <List />
            </Route>
            <Route path='/admin/users/:usersId'>
                <Form />
            </Route>
        </Switch>
    )

}

export default Users;
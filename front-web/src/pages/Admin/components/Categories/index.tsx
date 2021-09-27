import List from './List';
import { Route, Switch } from 'react-router-dom';

const Categories = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/categories" exact>
                    <List />
                </Route>
            </Switch>
        </div>
    )
}

export default Categories;
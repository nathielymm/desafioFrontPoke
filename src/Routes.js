import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './pages/list/List';
import Details from './pages/details/Details';
 
function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/:name" component={Details} />
      </Switch>
    </Router>
  );
}
 
export default Routes;
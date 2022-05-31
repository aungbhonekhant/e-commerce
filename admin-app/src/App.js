import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, getAllBrands, getAllTags } from "../src/actions";

import { isUserLoggedIn } from './actions'
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import NewPage from "./containers/NewPage";
import Brands from "./containers/Brands";
import Spinner from "./components/Spinner";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoadin] = useState(false);

  useEffect(() => {
    if (auth.authenticate) {
      setLoadin(true);
      dispatch(getInitialData()).then(() => setLoadin(false));
      dispatch(getAllBrands()).then(() => setLoadin(false));
      dispatch(getAllTags()).then(() => setLoadin(false));
    } else {
      dispatch(isUserLoggedIn());
    }

  }, [auth.authenticate]);



  return (
    <div className="App">
      {
        loading ? <Spinner /> 
        :
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/page" component={NewPage} />
          <PrivateRoute path="/categories" component={Category} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/brands" component={Brands} />
          <PrivateRoute path="/orders" component={Orders} />

          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      }

    </div>
  );
}

export default App;

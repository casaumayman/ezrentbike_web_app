import React, { Component } from 'react';
import Header from '../components/Header';
import ErrorPage from '../pages/ErrorPage';
import {Switch, Route} from 'react-router-dom';
import {appRouter} from '../routes/appRoutes';
import Search from '../components/Search';
import Fanpage from '../components/Fanpage';
import Video from '../components/Video';
import Map from '../components/Map';
import Advertisement from '../components/Advertisement';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from '../services/PrivateRoute';
import ProfileLayout from './ProfileLayout';
import Footer from '../components/Footer';
import AdminLayout from './AdminLayout';

const switchRoutes = (<Switch>
    {appRouter.map((item, index) => {
      return (<Route path={item.path} exact={item.exact} component={item.component} key={index} />);
    })}
    <PrivateRoute path="/profile" component={ProfileLayout} />
    <PrivateRoute path="/manager" component={AdminLayout} />
    <Route component={ErrorPage} />
  </Switch>);

class AppLayout extends Component {
    render() {
        document.title = "Thuê xe EzRentBike";
        return (
            <div className='container-fluid'>
                <Header></Header>
                <div className='row' style={{marginTop: '75px'}}>
                    <div className='col-md-9' style={{marginTop: '20px'}}>
                        {switchRoutes}
                    </div>
                    <div className='col-md-3' style={{marginRight: 'auto', marginLeft: 'auto'}}>
                        <Search></Search>
                        <Fanpage></Fanpage>
                        <Video></Video>
                        <Map></Map>
                        <Advertisement></Advertisement>
                    </div>
                </div>
                <Footer></Footer>
                <ToastContainer closeButton={false} autoClose={2000}></ToastContainer>
            </div>
        )
    }
}

export default AppLayout;
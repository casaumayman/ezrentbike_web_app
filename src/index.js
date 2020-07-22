import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import vi_VN from 'antd/lib/locale-provider/vi_VN';
import 'moment/locale/vi';
import { LocaleProvider } from 'antd';
//css
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'antd/dist/antd.css';
import './index.css';
import moment from 'moment';

moment.locale('vi');

const app = <Provider store={store}>
                <LocaleProvider locale={vi_VN}>
                    <App />
                </LocaleProvider>
            </Provider>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

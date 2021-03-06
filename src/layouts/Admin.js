import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

import Navbar from 'components/defaultComponents/Navbars/Navbar.js';
import Sidebar from '../components/defaultComponents/Sidebar/Sidebar.js';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import bgImage from 'assets/img/sidebar-4.jpg';

import DashboardPage from '../views/Dashboard/Dashboard.js';
import EntityOperationIdAdmin from '../views/EntityAdmin/EntityOperationIdAdmin';
import ClientList from '../views/Clients/ListClients';
import CourseList from '../views/Courses/ListCourses';
import AddCourse from '../views/Courses/AddCourses';
import AddTopics from '../views/Topics/AddTopics';
import EditTopics from '../views/Topics/EditTopics';
import TopicsList from '../views/Topics/ListTopics';
import ShowTopics from '../views/Topics/ShowTopics';
import PurchaseList from '../views/Purchases/ListPurchases';
import ShowGlobalStats from '../views/GlobalStats/ShowGlobalStats';
import TestResultsList from '../views/TestResults/ListTestResults';
import ShowTestResults from '../views/TestResults/ShowTestResults.js';

import Auth from './Auth';

const useStyles = makeStyles(styles);

export default function Admin({...rest}) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    return function cleanup() {
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  const updateUserInfo = async () => {
    // UPDATE USER INFO LOGIC...
    // No need to update for now, we are only going to use his jwt to access user info...
    // We need to make extra security check that in fact it's an admin's jwt and not a client
  };

  useEffect(() => {
    if (localStorage.getItem('session')) {
      updateUserInfo();
    }
  }, []);

  if (!localStorage.getItem('session')) {
    return <Auth />;
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        // logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color="purple"
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar handleDrawerToggle={handleDrawerToggle} {...rest} />
        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/admin/clients" component={ClientList} exact />
              <Route path="/admin/courses" component={CourseList} exact />
              <Route
                path="/admin/course/:operation"
                component={AddCourse}
                exact
              />
              <Route
                path="/admin/topic/add"
                component={AddTopics}
                exact
              />
              <Route
                path="/admin/topics"
                component={TopicsList}
                exact
              />
              <Route
                path="/admin/edit/topics/:id"
                component={EditTopics}
                exact
              />
              <Route
                path="/admin/show/topics/:id"
                component={ShowTopics}
                exact
              />
              <Route
                path="/admin/purchases"
                component={PurchaseList}
                exact
              />
              <Route
                path="/admin/stats/global"
                component={ShowGlobalStats}
                exact
              />
              <Route
                path="/admin/stats/testResults"
                component={TestResultsList}
                exact
              />
              <Route
                path="/admin/show/testResults/:id"
                component={ShowTestResults}
                exact
              />
              <Route
                path="/admin/:operation/:id/:query"
                component={EntityOperationIdAdmin}
                exact
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

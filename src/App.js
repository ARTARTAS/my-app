import React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/Common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Music from './components/Music/Music';
import NavBarContainer from './components/NavBar/NavBarContainer';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { withSuspense } from './hoc/withSuspense';
import { initializeApp } from './redux/app-reducer';
import store from './redux/redux-store';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));




class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return (
        <Preloader />)
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <NavBarContainer />
        <div className='app-wrapper__content' >
          <Route path='/login' render={withSuspense(Login)} />
          <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
          <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
          <Route path='/users' render={withSuspense(UsersContainer)} />
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/settings' render={() => <Settings />} />
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);;


const ReactApp = () => {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  )
}

export default ReactApp;


import React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
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
import store, { AppStateType } from './redux/redux-store';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedLogin = withSuspense(Login)


class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
    // alert("Some error occured");
    console.log(promiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return (
        <Preloader />)
    }
    return (
      <div className='app-wrapper' >
        <HeaderContainer />
        < NavBarContainer />
        <div className='app-wrapper__content' >
          <Switch>
            <Route exact path='/' render={() => <SuspendedProfile />} />
            <Route path='/login' render={() => <SuspendedLogin />} />
            <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/users' render={() => <SuspendedUsers />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='*' render={() => <div> 404 NOT FOUND </div>} />
          </Switch>
        </div>

      </div>
    );
  }
};

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);;


const ReactApp: React.FC = () => {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  )
}

export default ReactApp;


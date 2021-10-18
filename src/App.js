import React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/Common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import NavBarContainer from './components/NavBar/NavBarContainer';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import store from './redux/redux-store';


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
          <Route path='/login' render={() => <Login />} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/users' render={() => <UsersContainer />} />
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


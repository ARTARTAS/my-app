import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/redux-store';


let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    };
};

type mapPropsType = {
    isAuth: boolean
}

type DispatchPropsType={    
}
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<mapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to='/login' />;
        return <WrappedComponent {...restProps as WCP} />
    }


    let ConnectedRedirectComponent = connect<mapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedRedirectComponent;
}
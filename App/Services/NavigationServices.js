import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.currentNavProp.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  _navigator.currentNavProp.dispatch(StackActions.pop({
    n: 1
  }))
}

function pop(n) {
  _navigator.currentNavProp.dispatch(StackActions.pop({
    n
  }))
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop
};
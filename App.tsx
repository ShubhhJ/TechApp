import React from 'react';
import RootNavigation from './scr/navigation';
import { Provider } from 'react-redux';
import  store  from './scr/redux/store';

export default function App() {
  
  return( 
    <Provider store={store}>
     <RootNavigation />
    </Provider>
  );
}

# redux-async-load

This module merges the logic of loading data on the client side and the server side.

Purpose
-

When using react, we use to do async things (generally loading data etc...) in component life cycles.
When using redux with react, your connected components will generally be instances of "PureComponent", that means they are stateless.
(read more about react pure component and why this concept was introduced) 
This difference is a big thing, With redux, you store your data into the state (that is connected to props), not into component state.

When using SSR (Server side rendering), components doesn't really have life cycles, the "render" only occurs once (renderToString).
To have the state totally hydrated, we need to render multiple times.
During each render, components might dispatch actions to the store and the redux state might change, changing the result of the next render.

On client side, this is not a problem, when the state changes, connected components receives new props and will update.

So we need a module that is capable to re-render until the state appears to be ready without implementing a specific server logic.
We use the "componentWillMount" event on both env to dispatch loading action, and trigger an event to mark this component as loaded in the state.
On server side, each time the store receive a event like this, he will re render, until all the components are ready, then send the response to browser.

##### SSR workflow example:

1. Server is rendering
2. Component "Foo" dispatch an action to tell he is loading, and start doing jobs, result is going to the state to be connected later.
3. Data are loaded, "Foo" dispatch an action to tell he is ready
4. Store receive this action and examine the list of remaining actions
    - The list of remaining actions appears to be empty, that mean the state should have all required data to render "foo", do a final render.
    - OR
    - The list of remaining actions is not empty, "foo" or an other component is loading => we wait for next state notification then re render => (Go to 1.)

This allow us to have a deep three rendering on server side.


## Install

```ssh
npm install redux-async-load --save
```

## Api

#### renderAsync(store: Object, render: () => string):Promise<string>
For Server side only

##### Args
- store: Object 
  - the redux store implementing the reducer from this module and the rest of your data
- render: Function 
  - no args
  - return string
  - This method will be invoked for each render on server side, you must return the html of your app using renderToString from react-dom

## Components

#### \<ReduxLoader />
##### props
- loadId: string The Id of the connected element
- shouldLoad:(props) => boolean 
    - props: Object The props passed to the component
    - If this method return true, and if the component is not marked as loaded in state, the component will call the load method
- load: (props) => Promise<any>
    - props Object The props passed to the component
    - This method must return a promise one load has been done. Normally, It should returns the result of an async dispatching action
- shouldReload: (props) => boolean
    - props: Object The props passed to the component
    - If this method return true, the component will call the call method
- render: (props) => React.Element
    - props: Object The props passed to the component
    - If this property is present, It'll be used as the default render, and must return a single valid component. 



## Usage

### Create an async component
```javascript
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReduxLoader} from 'redux-async-load'
//this is a redux action creator to load data
import {loadMyUser as load} from './action'

const User = props => <p>{props.name}</p>

const AsyncUser = props => <ReduxLoader 
    {/* This is the unique identifier to store the status of the component in the store */}
    loadId="my-unique-state-id"
    
    {/* Do not load if we do not have data */}
    shouldLoad={props => !props.data}
    
    {/* This tells the component how to load your data */}
    {/* This is not required if you pass an action creator named "load" to connect */}
    load={props => props.load(props)}
    
    {/* The component receives props, tell him if he must reload data */}
    shouldReload={(props, oldProps) => (props.loadId !== oldProps.loadId) && !props.data}
    
    {/* This is the render method, use it to an altenrative way to render children */}
    {/* If the component contains chilren, they will be present in props.children */}
    render={props => <User {...props} />}
>
    {/* OR */}
    {/* This is the normal way of rendering ans element */}
    {/* <User /> will be a clone with all props hydrated to */}
    {/* If the property render is present, this will not be invoked */}
    <User />
</ReduxLoader>


//connect our component to the state
export default connect((state, props) => {
    const index = props.index
    return {
        loadId: 'async-load-'+index,
        name: state.user[index],
        language: state.language
    }
}, ({load}))(AsyncUser)

```

### Usage of the new async component where you want (app.js)
```javascript
export default props => (
    <div>
        <p>This component will be preloaded on server</p>
        <AsyncUser index={0}/>
    </div>
)
```

### Add the reducer to your redux store (store.js)
```javascript
import {createStore, combineReducers}  from 'redux'

export default createStore(combineReducers({
   asyncLoad: asyncReducer, // <-- add the reducer to your reducers 
   //[your reducers]
}), yourInitialState)
```

### Render on server side (server.js)
```javascript
import {renderToString} from 'react-dom'
import {renderAsync, reducer as asyncReducer} from 'redux-async-load'
import store from './store'
import App from './app'

//render async will subscribe to the store, and knows when the data are loaded
renderAsync(store, () => renderToString(<Provider store={store}><App /></Provider>))
    //Render the generated html as you do normally
    .then(html => {
        // Build your html structure with your favorite tool (like Helmet)
        const html = <Html component={<App />}/> 
        res.send('<!doctype html>\n' + html)
    })
    .catch(next)    
```

### Render on the client side as usual (client.js)
```javascript
import {render} from 'react-dom'
import store from './store'
import App from './app'

render(<Provider store={store}><App /></Provider>, document.getElementById('app-root'))
```

#### Disclamer

This is clearly experimental, and maybe removed if a better solution is found.
You should take all precautions to prevent huge loading.
If the schema of your app is very deep, you might want to preload data in a high order component that will prevent re rendering one more time

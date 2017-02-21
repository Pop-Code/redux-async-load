#redux-async-load

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

#####SSR workflow example:

1. Server is rendering
2. Component "Foo" dispatch an action to tell he is loading, and start doing jobs, result is going to the state to be connected later.
3. Data are loaded, "Foo" dispatch an action to tell he is ready
4. Store receive this action and examine the list of remaining actions
5.
    - The list of remaining actions appears to be empty, that mean the state should have all required data to render "foo", do a final render.
    - OR
    - The list of remaining actions is not empty, "foo" or an other component is loading => render again. (Go to 1.)

This allow us to have a deep three rendering on server side.


##Install

```ssh
npm install redux-async-load --save
```

##Usage

Todo...


####Disclamer

This is clearly experimental, and maybe removed if a better solution is found.
You should take all precautions to prevent huge loading.
If the schema of your app is very deep, you might want to preload data in a high order component that will prevent re rendering one more time

import React, { useContext, createContext, useState } from 'react';
import { useImmerReducer } from 'use-immer';

const initialConfigureStore = {
  context: () => createContext({}),
  dispatch: () => createContext({}),
  initialState: {},
  reducer: {},
}

const StoreContext = createContext(initialConfigureStore)

// Feature Context Provider
export const FeatureContextProvider = React.memo(({ children, name, store }) => {
  const AppContext = store.context(name)
  const AppDispatchContext = store.dispatch(name)
  const [state, dispatch] = useImmerReducer(store.reducer[name], store.initialState[name])
  return (
    <AppContext.Provider value={state} displayName={`${name}_context`}>
      <AppDispatchContext.Provider value={dispatch} displayName={`${name}_dispatch_context`} >
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
})

FeatureContextProvider.defaultProps = {
  name: 'app',
  store: initialConfigureStore,
  children: null,
}

const ContextComposer = ({contexts, children}) => {
  // Compose Consumers for renderfns
  if (typeof children === 'function') {
    const curriedContexts = [];
    const curry = (currentContexts) => {
      if (!currentContexts.length) {
        return children(...curriedContexts);
      }

      const Context = currentContexts.pop();

      return (
        <Context.Consumer>
          {(providedContext) => {
            curriedContexts.push(providedContext);

            return curry(currentContexts);
          }}
        </Context.Consumer>
      );
    }

    return curry(contexts.slice().reverse());

  // Compose Providers
  } else {
    return contexts.reduceRight((children, parent, i) => {
      return React.cloneElement(parent, {
        children,
      });
    }, children);
  }
}

export const Provider = ({ features, children, store }) => {
  const [context] = useState(store);
  const contexts = features.map(name => <FeatureContextProvider store={store} name={name} />)
  return (
    <StoreContext.Provider value={context}>
      <ContextComposer contexts={contexts}>
        {children}
      </ContextComposer>
    </StoreContext.Provider>
  )
}

Provider.defaultProps = {
  features: [],
}

// Custom Hooks
const useSelector = (reducerName, callback) => {
  const myStore = useContext(StoreContext)
  const state = useContext(myStore.context(reducerName));
  return callback(state)
}

const useDispatch = (reducerName) => {
  const myStore = useContext(StoreContext)
  const dispatch = useContext(myStore.dispatch(reducerName));
  return dispatch;
}

export {
  useSelector,
  useDispatch,
}


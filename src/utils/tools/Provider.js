import React from 'react';
import { FeatureContextProvider } from "../../contexts/FeatureContextProvider"

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

export const Provider = ({ features, children }) => {
  const contexts = features.map(name => <FeatureContextProvider name={name} />)
  return (
    <ContextComposer contexts={contexts}>
      {children}
    </ContextComposer>
  )
}

Provider.defaultProps = {
  features: [],
}
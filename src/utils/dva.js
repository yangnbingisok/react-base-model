import { create } from 'dva-core'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage/session'
import { createLogger } from 'redux-logger'
// import createLoading from "dva-loading";

let app
let store
let dispatch

const persistConfig = {
  key: 'editor',
  storage,
}
const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer)
  const persist = persistStore(store)
  return { ...store, persist }
}

export function createApp(opt) {
  // redux日志
  opt.onAction = [createLogger()]
  app = create({
    ...opt,
    extraEnhancers: [persistEnhancer()],
  })
  // app.use(createLoading({}));

  if (!window.dvaRegistered) {
    opt.models.forEach(model => app.model(model))
  }
  window.dvaRegistered = true
  app.start()

  store = app._store
  app.getStore = () => store

  dispatch = store.dispatch

  app.dispatch = dispatch
  console.log(app)
  return app
}

export const getDispatch = () => {
  return app.dispatch
}

export const getStoreState = () => {
  return store.getState()
}

import { getStoreState } from './dva'

export const removeComponent = () => {
  const components = getRootComponents()
  return components
}

export const getRootComponents = () => {
  return getEditorState().components
}

export const getPageConfig = () => {
  return getEditorState().pageConfig
}

export const getEditorState = () => {
  return getStoreState().editor
}

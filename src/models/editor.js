import { getActivityPageConfig, savePageInfo, saveSnapshot, getSnapshot } from '@/services/page'
import { getCategories } from '@/services/category'
import { getCornerList } from '@/services/corner'
import { getInLinks } from '@/services/links'

const initialState = {
  components: [],
  focusId: null,
}

export default {
  namespace: 'editor',
  state: initialState,
  effects: {
    *initialPage({ payload }, { put, call }) {
      const { activityid, success } = payload
      const apiCalls = [
        call(getCategories),
        call(getCornerList),
        call(getActivityPageConfig, activityid),
        call(getInLinks),
      ]
      const res = yield apiCalls
      yield put({
        type: '_setPage',
        payload: res,
      })
      if (success) {
        success()
      }
    },

    *save({ payload }, { call }) {
      const { pageInfo, success } = payload
      const res = yield call(savePageInfo, pageInfo)
      if (success) {
        success(res)
      }
    },

    *saveSnapshot({ payload }, { call }) {
      const { data, success } = payload
      const res = yield call(saveSnapshot, data)
      if (success) {
        success(res)
      }
    },

    *getSnapshot({ payload }, { call }) {
      const { parentid, success } = payload
      const res = yield call(getSnapshot, parentid)
      if (success) {
        success(res)
      }
    },
  },
  reducers: {
    _setPage(state, { payload }) {
      return {
        ...state,
        categories: payload[0],
        corners: payload[1],
        pageConfig: payload[2],
        inLinks: payload[3],
      }
    },

    _resetStatus(state) {
      return {
        ...state,
        components: [],
      }
    },
  },
}
/*
  调用
    this.props.dispatch({
      type: 'editor/_resetStatus',
      payload: {
        activityKey,
      },
    })
*/

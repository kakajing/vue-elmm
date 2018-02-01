/**
 * Created by user on 2018/1/6.
 */
import * as types from './mutation-types'
import {saveSearch} from 'common/js/cache'

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

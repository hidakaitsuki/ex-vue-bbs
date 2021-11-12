import { Article } from '@/views/types/Article'
import { Comment } from '@/views/types/Comment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
getters:{
/**
 * 
 * @param state ステートオブジェクト
 * @returns 投稿情報の一覧
 */
getArticles(state){
  return state.articles
}

}
})

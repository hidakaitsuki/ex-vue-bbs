import { Article } from "@/views/types/Article";
import { Comment } from "@/views/types/Comment";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
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
    /**
     * 記事情報を配列の一番最初に追加する.
     * @param state ステートオブジェクト
     * @param payload 入力された記事情報
     */
    addArticle(state, payload) {
      state.articles.unshift(payload);
    },
    /**
     *コメント情報を配列一番最初に追加する.
     * @param state ステートオブジェクト
     * @param payload 入力されたコメント情報
     */
    addComment(state, payload) {
      const commentArticle = state.articles.filter(
        (article) => article.id == payload.articleId
      );
      const newComment = new Comment(
        payload.id,
        payload.name,
        payload.content,
        payload.articleId
      );
      commentArticle[0].commentList.unshift(newComment);
    },
    /**
     * 渡された番号の記事を削除する.
     * @param state ステートオブジェクト
     * @param payload 対象の記事のインデックス番号
     */
    deleteArticle(state, payload) {
      state.articles.splice(payload, 1);
    },
  },
  actions: {},
  modules: {},
  getters: {
    /**
     * 記事一覧を返す.
     * @param state ステートオブジェクト
     * @returns 記事一覧
     */
    getArticles(state) {
      return state.articles;
    },
    /**
     * 最新のIDを返す
     * @param state ステートオブジェクト
     * @returns 最新のID
     */
    getNewId(state) {
      return state.articles[0].id + 1;
    },
  },
});

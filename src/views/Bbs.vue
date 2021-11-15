<template>
  <div>
    <h1>掲示板サイト</h1>
    <p v-if="nameError" class="error">名前を入力してください</p>
    <p v-if="nameLengthError" class="error">名前は50字以内で入力してください</p>
    投稿者名<input type="text" v-model="name" /><br />
    <p v-if="contentError" class="error">内容を入力してください</p>

    投稿内容<textarea
      name=""
      id=""
      cols="30"
      rows="5"
      v-model="content"
    ></textarea
    ><br />
    <button type="button" v-on:click="addArticle">記事投稿</button>

    <hr />
    <div
      v-for="(currentArticle, i) of currentArticles"
      v-bind:key="currentArticle.id"
    >
      <p>投稿者名：{{ currentArticle.name }}</p>
      <p>
        投稿内容：<br />
        {{ currentArticle.content }}
      </p>

      <button type="button" v-on:click="deleteArticle(i)">投稿削除</button>

      <p v-for="comment of currentArticle.commentList" v-bind:key="comment.id">
        コメント者名：{{ comment.name }} <br />
        コメント内容：<br />
        {{ comment.content }}
      </p>
      <comp-comment v-bind:articleId="currentArticle.id"></comp-comment>

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Article } from "./types/Article";
import CompComment from "../components/CompComment.vue";
@Component({
  components: { CompComment },
})
export default class Bbs extends Vue {
  // 現在の記事情報
  private currentArticles = [];
  //   入力された投稿者名
  private name = "";
  //   入力された投稿内容
  private content = "";
  //   現在の記事のコメントリスト
  private currentcomment = [];
  // 名前が未入力のときのエラーメッセージ
  private nameError = false;
  // 名前が51文字以上のときのエラーメッセージ
  private nameLengthError = false;
  // 内容がが未入力のときのエラーメッセージ
  private contentError = false;
  /**
   * 現在投稿されている内容を一覧で表示する.
   */
  created(): void {
    this.currentArticles = this["$store"].getters.getArticles;
  }
  /**
   * 入力された内容を記事に追加する.
   */
  addArticle(): void {
    this.nameError = false;
    this.nameLengthError = false;
    this.contentError = false;

    // 名前が空ならエラーを表示する
    if (this.name == "") {
      this.nameError = true;
    }
    // 名前が51文字以上ならエラーを表示する
    if (this.name.length >= 51) {
      this.nameLengthError = true;
    }
    // 内容が空ならエラーを表示する
    if (this.content == "") {
      this.contentError = true;
    }

    // エラーが1つでもあれば処理を先に進めない
    if (
      this.nameError == true ||
      this.nameLengthError == true ||
      this.contentError == true
    ) {
      return;
    }

    // 最新のIDを取得
    const newId = this["$store"].getters.getNewId;
    this["$store"].commit(
      "addArticle",
      new Article(newId, this.name, this.content, [])
    );

    // 入力内容をリセットする
    this.name = "";
    this.content = "";
  }
  /**
   * 記事を削除する.
   *
   * @param  articleIndex - 記事のIndex番号
   */
  deleteArticle(articleIndex: number): void {
    this["$store"].commit("deleteArticle", articleIndex);
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

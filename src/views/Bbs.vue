<template>
  <div>
    <h1>掲示板サイト</h1>
    投稿者名<input type="text" v-model="name" /><br />
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
      v-for="currentArticle of currentArticles"
      v-bind:key="currentArticle.id"
    >
      <p>投稿者名：{{ currentArticle.name }}</p>
      <p>
        投稿内容：<br />
        {{ currentArticle.content }}
      </p>

      <button type="button">投稿削除</button>

      <p v-for="comment of currentArticle.commentList" v-bind:key="comment.id">
        コメント者名：{{ comment.name }} <br />
        コメント内容：<br />
        {{ comment.content }}
      </p>

      <p>
        名前：<br />
        <input type="text" v-model="commentName" />
      </p>
      <p>
        コメント：<br />
        <textarea name="" id="" cols="30" rows="5" v-model="commentContent">
        </textarea
        ><br />
        <button type="button" v-on:click="addComment(currentArticle.id)">
          コメント投稿
        </button>
      </p>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Article } from "./types/Article";
import { Comment } from "./types/Comment";

@Component
export default class Bbs extends Vue {
  // 現在の記事情報
  private currentArticles = [];
  //   入力された投稿者名
  private name = "";
  //   入力された投稿内容
  private content = "";
  //   現在の記事のコメントリスト
  private currentcomment = [];
  //   コメントに入力された名前
  private commentName = "";
  // 入力されたコメント
  private commentContent = "";
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
    // 最新のIDを取得
    const newId = this["$store"].getters.newId;
    this["$store"].commit(
      "addArticle",
      new Article(newId, this.name, this.content, [])
    );
    // 入力内容をリセットする
    this.name = "";
    this.content = "";
  }
  /**
   * 入力された内容をコメントに追加する
   */
  addComment(articleId: number): void {
    this["$store"].commit(
      "addComment",
      new Comment(-1, this.commentName, this.commentContent, articleId)
    );
    // 入力内容をリセットする
    this.commentName = "";
    this.commentContent = "";
  }
}
</script>

<style></style>

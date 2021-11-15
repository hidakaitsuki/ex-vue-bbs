<template>
  <div>
    <p v-if="nameError" class="error">名前を入力してください</p>
    <p v-if="nameLengthError" class="error">名前は50字以内で入力してください</p>
    名前：<br />
    <input type="text" v-model="name" />

    <p></p>
    <p v-if="contentError" class="error">内容を入力してください</p>
    コメント：<br />
    <textarea name="" id="" cols="30" rows="5" v-model="content"> </textarea>

    <p>
      <button type="button" v-on:click="addComment(articleId)">
        コメント投稿
      </button>
    </p>
  </div>
</template>

<script lang="ts">
import { Comment } from "@/views/types/Comment";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class CompComment extends Vue {
  //   コメントに入力された名前
  name = "";
  // 入力されたコメント
  content = "";
  // 名前が未入力のときエラーメッセージ
  nameError = false;
  // 名前が51文字以上のときのエラーメッセージ
  nameLengthError = false;
  // 内容がが未入力のときのエラーメッセージ
  contentError = false;

  @Prop()
  articleId!: number;
  /**
   * 入力された内容をコメントに追加する.
   */
  addComment(articleId: number): void {
    this.nameError = false;
    this.nameLengthError = false;
    this.contentError = false;

    // 名前が空ならエラーを表示する
    if (this.name == "") {
      this.nameError = true;
    }

    // 名前51文字以上ならエラーを表示する
    if (this.name.length >= 51) {
      this.nameLengthError = true;
    }

    // 内容が空ならエラーを表示する
    if (this.content == "") {
      this.contentError = true;
    }

    // エラーが1つでもあれば処理を進めない
    if (
      this.nameError == true ||
      this.nameLengthError == true ||
      this.contentError == true
    ) {
      return;
    }

    this["$store"].commit(
      "addComment",
      new Comment(-1, this.name, this.content, articleId)
    );

    // 入力内容をリセットする
    this.name = "";
    this.content = "";
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

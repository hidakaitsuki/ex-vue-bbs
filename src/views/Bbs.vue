<template>
  <div>
    <h1>掲示板サイト</h1>
    投稿者名<input type="text" /><br />
    投稿内容<textarea name="" id="" cols="30" rows="5"></textarea>
    <hr />
    <div
      v-for="currentArticle of currentArticles"
      v-bind:key="currentArticle.id"
    >
      <p>投稿者名：{{ currentArticle.name }}</p>
      <p>投稿内容：<br />
      {{ currentArticle.content }}</p>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Bbs extends Vue {
    // 現在の投稿情報
  private currentArticles = [];

  created(): void {
    this.currentArticles = this["$store"].getters.getArticles;
  }
}
</script>

<style></style>

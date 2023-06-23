<script setup lang="ts">
import BaseProfileHeader from '../components/profile-header.vue'
import BaseResolutionCategory from '../components/profile-resolution-categories.vue'
import BaseUserPost from '../components/user-post.vue'
</script>

<template>
  <div class="main-content-container">
    <BaseProfileHeader></BaseProfileHeader>
    <hr class="border-2" />
    <BaseResolutionCategory></BaseResolutionCategory>
    <hr class="border-2" />
    <BaseUserPost></BaseUserPost>
    <BaseUserPost></BaseUserPost>
    <BaseUserPost></BaseUserPost>
  </div>
</template>

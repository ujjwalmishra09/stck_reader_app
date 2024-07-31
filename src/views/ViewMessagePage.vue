<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Story</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="article">
      <ion-img alt="Silhouette of mountains" :src="article.meta.cover.src.fallback" />
      <ion-card-header>
        <ion-card-title>{{ article.title }}</ion-card-title>
      </ion-card-header>

      <ion-card-content class="custom-card-content">
        <div class="clamp-text">
          {{ article.summary }}
        </div>
      </ion-card-content>

    <ion-list :inset="true">
      <chapter-list-item v-for="chapter in article.meta.children" :key="chapter.id" :chapter="chapter" />
    </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonCardTitle,
  IonCardHeader,
  IonList,
  IonCardContent,
  IonImg
} from '@ionic/vue';
import { watch } from 'vue';
import { useFetch } from '@vueuse/core'
import { onIonViewDidEnter, loadingController } from '@ionic/vue';

import ChapterListItem from '@/components/ChapterListItem.vue';

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return mode === 'ios' ? 'Stories' : '';
};

const route = useRoute();

let loading;

const { execute, isFetching, data: article } = useFetch(`https://magicallovely.stck.me/api/r/45840/posts/${route.params.id}`, { immediate: false }).json();

watch(isFetching, async (newValue, oldValue) => {
  if (newValue && !oldValue) {
    if (loading) return;
    loading = await loadingController.create({
          message: 'Loading Story',
          duration: 3000
        });

        loading.present();
  } else {
    console.log(article);
     if (loading) loading?.dismiss?.()
     loading = null
  }
})

onIonViewDidEnter(() => {
  execute();
});
</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

ion-item h2 {
  font-weight: 600;
  
  /**
   * With larger font scales
   * the date/time should wrap to the next
   * line. However, there should be
   * space between the name and the date/time
   * if they can appear on the same line.
   */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

ion-item .date {
  align-items: center;
  display: flex;
}

ion-item ion-icon {
  font-size: 42px;
  margin-right: 8px;
}

ion-item ion-note {
  font-size: 0.9375rem;
  margin-right: 12px;
  font-weight: normal;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 1.4rem;
}

p {
  line-height: 1.4;
}

.clamp-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3; /* Number of lines to show */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

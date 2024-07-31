<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Stories</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Stories</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list lines="none">
        <MessageListItem v-for="message in articles" :key="message.id" :message="message" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { onIonViewDidEnter, loadingController } from '@ionic/vue';
import { useFetch } from '@vueuse/core'
import MessageListItem from '@/components/MessageListItem.vue';
import { watch } from 'vue';

let loading;

const { execute, isFetching, data: articles } = useFetch('https://magicallovely.stck.me/api/r/45840/posts?ptype=dg&ptype=blog&ptype=parent', { immediate: false }).json()

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
    execute()
  }, 3000);
};

watch(isFetching, async (newValue, oldValue) => {
  if (newValue && !oldValue) {
    if (loading) return;
    loading = await loadingController.create({
          message: 'Loading Stories',
          duration: 3000
        });

        loading.present();
  } else {
     if (loading) loading?.dismiss?.()
     loading = null
  }
})

onIonViewDidEnter(() => {
  execute();
});

</script>

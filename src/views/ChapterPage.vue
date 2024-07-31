<template>
  <ion-page>
        <!-- <div v-html="chapter?.content"></div> -->
        <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Chapter</ion-title>
      </ion-toolbar>
    </ion-header>
         <ion-content>
           <div v-html="article?.content"></div>
         </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton } from '@ionic/vue';
import { watch } from 'vue';
import { useFetch } from '@vueuse/core'
import { onIonViewDidEnter, loadingController } from '@ionic/vue';
import { useRoute } from 'vue-router';

defineProps({
  chapter: Object,
});

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return mode === 'ios' ? 'Stories' : '';
};


let loading;

const route = useRoute();

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
</style>

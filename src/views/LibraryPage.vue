<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Library</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper :modules="modules" :autoplay="true" :keyboard="true" :pagination="true" :scrollbar="true" :zoom="true">
        <swiper-slide v-for="message in articles" :key="message.id" > <MessageListItem :message="message" /></swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonicSlides } from '@ionic/vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { onIonViewDidEnter, loadingController } from '@ionic/vue';
import { useFetch } from '@vueuse/core'
import { watch } from 'vue';
import MessageListItem from '@/components/MessageListItem.vue';

import { ref } from 'vue';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';

let loading;

  import 'swiper/css';
  import '@ionic/vue/css/ionic-swiper.css';

  const { execute, isFetching, data: articles } = useFetch('https://magicallovely.stck.me/api/r/45840/posts?ptype=dg&ptype=blog&ptype=parent', { immediate: false }).json()


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

const modules = ref([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

</script>

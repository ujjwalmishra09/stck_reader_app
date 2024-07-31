<template>
      <ion-item :routerLink="'/chapter/' + chapter?.id" :button="true" :detail="false">
        <ion-thumbnail slot="start">
            <ion-img :src="chapter?.meta?.cover?.src?.image"></ion-img>
    </ion-thumbnail>
        <ion-label>
          <strong>{{ chapter?.title }}</strong>
          <br />
          <ion-note color="medium" class="ion-text-wrap">
            {{ chapter?.summary }}
          </ion-note>
        </ion-label>
        <div class="metadata-end-wrapper" slot="end">
          <ion-icon color="medium" :icon="chevronForward"></ion-icon>
        </div>
      </ion-item>
  </template>
  
  <script setup lang="ts">
  import { IonItem, IonImg, IonThumbnail, IonLabel, IonIcon, IonNote } from '@ionic/vue';
  import { chevronForward } from 'ionicons/icons';
  
  defineProps({
    chapter: Object,
  });
  
  </script>
  <style scoped>
  .metadata-end-wrapper {
    position: absolute;

    top: 10px;
    inset-inline-end: 10px;

    font-size: 0.8rem;

    display: flex;
    align-items: center;
  }

  ion-label strong {
    display: block;

    max-width: calc(100% - 60px);

    overflow: hidden;

    text-overflow: ellipsis;
  }

  ion-label ion-note {
    font-size: 0.9rem;
  }
  </style>
  
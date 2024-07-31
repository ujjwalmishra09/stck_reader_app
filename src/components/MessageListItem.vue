<template>
  <ion-item v-if="message" :routerLink="'/article/' + message.id" :detail="false" class="list-item">
    <ion-card>
      <ion-img alt="Silhouette of mountains" :src="message.meta.cover.src.fallback" />
      <ion-card-header>
        <ion-card-title>{{ message.title }}</ion-card-title>
      </ion-card-header>

      <ion-card-content class="custom-card-content">
        <div class="clamp-text">
          {{ message.summary }}
        </div>
      </ion-card-content>
    </ion-card>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from '@ionic/vue';

defineProps({
  message: Object,
});

</script>
<style scoped>
.clamp-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3; /* Number of lines to show */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Radio</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">Radio content</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';
</script>

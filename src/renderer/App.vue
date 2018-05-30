<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <v-layout justify-center>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'insight'
  }
</script>

<style>
  #app .container {
    margin: 0;
    padding: 0;
  }
</style>

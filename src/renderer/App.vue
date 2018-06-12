// ~~~~~~~~~~~~~~~~~~~~
// App component - root
// ~~~~~~~~~~~~~~~~~~~~

<template>
  <div id="app">
    <v-app :dark='false'>
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
  .container {
    margin: 0;
    padding: 0;
  }
</style>

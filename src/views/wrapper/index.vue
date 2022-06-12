<template>
  <div>
    <v-app-bar
      style="background-color: white"
      height="50"
      hide-on-scroll
      app
      flat
      elevation="3"
      class="pa-0"
    >
      <v-container
        style="width: 80%"
        class="d-flex justify-space-between align-center pa-0"
      >
        <div class="d-flex align-center">
          <router-link to="/">
            <v-img src="../../assets/logo.png" width="160px" height="43px" />
          </router-link>

          <v-menu v-if="currentCity" offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-8"
                color="#6100FF"
                outlined
                v-bind="attrs"
                v-on="on"
              >
                {{ currentCity.name }}
              </v-btn>
            </template>

            <v-list max-height="200">
              <v-list-item v-for="(item, index) of cities" :key="index">
                <v-btn
                  @click="setCurrentCity(item)"
                  color="white"
                  block
                  depressed
                  >{{ item.name }}</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div v-if="!visibleName">
          <v-btn
            :to="makeSignUpLink()"
            depressed
            color="#6100FF"
            class="mr-5"
            outlined
            small
          >
            Регистрация
          </v-btn>
          <v-btn
            :to="makeLoginLink()"
            style="color: white"
            depressed
            color="#6100FF"
            small
          >
            Войти
          </v-btn>
        </div>
        <div v-else>
          <v-menu offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="text-none"
                color="#6100FF"
                outlined
                v-bind="attrs"
                v-on="on"
              >
                {{ visibleName }}
              </v-btn>
            </template>

            <v-list max-height="200">
              <v-list-item :to="makeProfileLink()" link> Профиль </v-list-item>
              <v-list-item @click="logout()" link>Выйти</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <v-main style="width: 80%" class="mt-5 ma-auto pa-0">
      <router-view />
    </v-main>
  </div>
</template>

<style>
.v-toolbar__content {
  padding: 0 !important;
}
</style>
<script src="./Wrapper.view.ts"></script>

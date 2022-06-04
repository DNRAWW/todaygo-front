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
          <v-img src="../../assets/logo.png" width="160px" height="43px" />

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-16"
                color="#6100FF"
                outlined
                v-bind="attrs"
                v-on="on"
                >Санкт-петербург</v-btn
              >
            </template>

            <v-list max-height="200">
              <v-list-item
                ><v-btn color="white" block depressed
                  >Санкт-Петербург</v-btn
                ></v-list-item
              >
              <v-list-item>
                <v-btn color="white" block depressed>Москва</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn color="white" block depressed>Челябинск</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div>
          <v-btn depressed color="#6100FF" class="mr-5" outlined small
            >Регистрация</v-btn
          >
          <v-btn style="color: white" depressed color="#6100FF" small
            >Войти</v-btn
          >
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="pa-0 ma-0">
      <router-view />
    </v-main>

    <v-footer
      height="100"
      style="background-color: #6100ff; color: white"
      absolute
      v-if="false"
    >
      <v-container style="width: 80%" class="ma-auto pa-0">
        <v-row class="ma-0" justify="space-between" align="center">
          <img src="../../assets/logo_footer.png" width="200" height="60px" />
          <router-link to="123">Помощь</router-link>
          <router-link to="123">Контакты</router-link>
        </v-row>
        <v-row class="ma-0" justify="center">
          <p class="ma-0 font-weight-bold">© 2022 Nikolay Yurchenko</p>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<style>
.v-toolbar__content {
  padding: 0 !important;
}
</style>
<script src="./Wrapper.view.ts"></script>

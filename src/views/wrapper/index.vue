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
        class="header__container d-flex justify-space-between align-center pa-0"
      >
        <div class="d-flex align-center">
          <router-link to="/">
            <v-img src="../../assets/logo.png" width="160px" height="43px" />
          </router-link>

          <v-menu class="mobile-nav" offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mobile-nav ml-8"
                color="#6100FF"
                outlined
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>

            <v-list max-height="200">
              <v-list-item v-if="!visibleName">
                <v-btn
                  :to="makeSignUpLink()"
                  depressed
                  color="#6100FF"
                  class="mr-5"
                  outlined
                >
                  Регистрация
                </v-btn>
              </v-list-item>

              <v-list-item v-if="!visibleName">
                <v-btn
                  :to="makeLoginLink()"
                  style="color: white"
                  depressed
                  color="#6100FF"
                >
                  Войти
                </v-btn>
              </v-list-item>

              <v-list-item v-else>
                <v-menu offset-y transition="scroll-y-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-none mr-2"
                      color="#6100FF"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ visibleName }}
                    </v-btn>
                  </template>

                  <v-list max-height="200">
                    <v-list-item :to="makeProfileLink()" link>
                      Профиль
                    </v-list-item>
                    <v-list-item
                      :to="makeAdminLink()"
                      link
                      v-if="role === 'ADMIN'"
                    >
                      Админка
                    </v-list-item>
                    <v-list-item @click="logout()" link>Выйти</v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="user" v-if="!visibleName">
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
        <div class="user" v-else>
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
              <v-list-item :to="makeAdminLink()" link v-if="role === 'ADMIN'">
                Админка
              </v-list-item>
              <v-list-item @click="logout()" link>Выйти</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="mt-5 ma-auto pa-0">
      <router-view />
    </v-main>
  </div>
</template>

<style scoped>
.v-toolbar__content {
  padding: 0 !important;
}

.v-main {
  width: 80% !important;
}

.header__container {
  width: 80% !important;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .v-main {
    width: 100% !important;
  }

  .header__container {
    width: 100% !important;
  }
}

@media (max-width: 511px) {
  .cities,
  .user {
    display: none;
  }
  .mobile-nav {
    display: block;
  }
}
</style>
<script src="./Wrapper.view.ts"></script>

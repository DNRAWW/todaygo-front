<template>
  <div class="background">
    <v-card class="auth-form rounded-xl">
      <v-img src="../../../assets/logo.png" width="50%" class="ma-auto"></v-img>
      <v-form v-model="formValid" ref="form" class="mt-16 mx-10">
        <v-text-field
          v-model="login"
          placeholder="Логин"
          filled
          :rules="loginRules"
        ></v-text-field>
        <v-text-field
          type="password"
          placeholder="Пароль"
          filled
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-flex class="d-flex justify-center mb-2">
          <v-btn
            large
            :loading="isLoading"
            :disabled="!formValid"
            @click="makeLogin()"
            >Войти</v-btn
          >
        </v-flex>
        <v-snackbar v-model="isWrongLogin" color="red accent-2">
          <div class="d-flex align-center">
            <div>
              {{ wrongLoginText }}
            </div>
            <div class="ml-auto">
              <v-icon text @click="isWrongLogin = false"> mdi-close </v-icon>
            </div>
          </div>
        </v-snackbar>
      </v-form>
    </v-card>
  </div>
</template>

<style src="./Login.css" scoped />
<script src="./Login.view.ts" />

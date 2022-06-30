<template>
  <div class="background">
    <v-card class="auth-form rounded-xl">
      <v-img src="../../../assets/logo.png" width="50%" class="ma-auto"></v-img>
      <p class="mx-3">
        Чтобы получить права организатора пишите на почту:
        <b>почта</b>
      </p>
      <v-form v-model="formValid" ref="form" class="mt-10 mx-10">
        <v-text-field
          v-model="login"
          dense
          placeholder="Логин"
          :errorMessages="loginTaken"
          filled
          :rules="loginRules"
          @focus="loginTaken = ''"
        ></v-text-field>
        <v-text-field
          dense
          type="password"
          placeholder="Пароль"
          filled
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          dense
          type="password"
          placeholder="Повторите пароль"
          filled
          v-model="password2"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          v-model="visibleName"
          dense
          :errorMessages="nameTaken"
          placeholder="Видимое имя"
          filled
          :rules="visibleNameRules"
          @focus="nameTaken = ''"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          dense
          placeholder="Фамилия"
          filled
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="firstName"
          dense
          placeholder="Имя"
          filled
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="surName"
          dense
          placeholder="Отчество"
          filled
          :rules="nameRules"
        ></v-text-field>
        <v-menu
          v-model="fromDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="mb-2"
              label="Дата рождения"
              readonly
              :value="formatedDate(dateOfBirth)"
              v-on="on"
              filled
              @focus="fromDateMenu = true"
              :rules="dateRules"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            locale="ru"
            :allowed-dates="allowedDates"
            v-model="dateOfBirth"
            no-title
            @input="fromDateMenu = false"
          ></v-date-picker>
        </v-menu>
        <v-flex class="d-flex justify-center mb-2">
          <v-btn :loading="isLoading" :disabled="!formValid" @click="register()"
            >Зарегестрироваться</v-btn
          >
        </v-flex>
        <v-snackbar v-model="isWrongReg" color="red accent-2">
          <div class="d-flex align-center">
            <div>
              {{ wrongRegText }}
            </div>
            <div class="ml-auto">
              <v-icon text @click="isWrongReg = false"> mdi-close </v-icon>
            </div>
          </div>
        </v-snackbar>
      </v-form>
    </v-card>
  </div>
</template>

<style src="./Signup.css" scoped />
<script src="./Signup.view.ts" />

<template>
  <div>
    <v-card :loading="isLoading" class="py-5">
      <v-card-title class="mb-5">Редактирование профиля</v-card-title>
      <v-form v-model="personFormValid" ref="form" class="mx-10">
        <v-text-field
          label="Видимое имя"
          v-model="newVisibleName"
          dense
          :errorMessages="nameTaken"
          @focus="nameTaken = ''"
          filled
          :rules="visibleNameRules"
        ></v-text-field>
        <v-text-field
          label="Фамилия"
          v-model="lastName"
          dense
          filled
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          label="Имя"
          v-model="firstName"
          dense
          filled
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          label="Отчество"
          v-model="surName"
          dense
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
              filled
              readonly
              :value="formatedDate(dateOfBirth)"
              v-on="on"
              @focus="fromDateMenu = true"
              @click="fromDateMenu = true"
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
        <v-dialog max-width="400" v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-flex class="d-flex justify-center mb-2">
              <v-btn
                :loading="isLoading"
                :disabled="!personFormValid"
                v-on="on"
                v-bind="attrs"
              >
                Сохранить
              </v-btn>
            </v-flex>
          </template>

          <v-card>
            <v-card-title>Вы уверены?</v-card-title>
            <v-divider class="mb-2"></v-divider>
            <v-card-actions class="justify-space-between">
              <v-btn color="blue darken-1" text @click="changePerson()">
                Да
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Нет</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>

      <v-divider class="mt-10"></v-divider>
      <v-divider></v-divider>

      <v-form v-model="userFormValid" class="mt-10 mx-10">
        <v-text-field
          dense
          type="password"
          placeholder="Текущий пароль"
          filled
          :errorMessages="wrongPassword"
          @focus="wrongPassword = ''"
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          dense
          type="password"
          placeholder="Новый пароль"
          filled
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          dense
          type="password"
          placeholder="Повторите новый пароль"
          filled
          v-model="password2"
          :rules="passwordRules"
        ></v-text-field>

        <v-flex class="d-flex justify-center mb-2">
          <v-btn
            :loading="isLoading"
            :disabled="!userFormValid"
            @click="register()"
          >
            Сохранить
          </v-btn>
        </v-flex>
      </v-form>
    </v-card>
  </div>
</template>

<script src="./PersonEdit.view.ts" />

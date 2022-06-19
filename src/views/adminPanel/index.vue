<template>
  <div>
    <v-card :loading="isLoading" class="pa-5">
      <v-card-title>Поиск пользователей</v-card-title>
      <v-form
        @submit.prevent="searchByLogin()"
        v-model="findByLoginValid"
        class="d-flex"
      >
        <v-text-field
          :rules="loginRules"
          placeholder="Логин"
          v-model="login"
          filled
          dense
        ></v-text-field>
        <v-btn
          @click="searchByLogin()"
          :disabled="!findByLoginValid"
          class="ml-5"
          >Поиск</v-btn
        >
      </v-form>
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Полное имя</th>
              <th class="text-left">Логин</th>
              <th class="text-left">Видимое имя</th>
              <th class="text-left">Дата рождения</th>
              <th class="text-left">Роль</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="user && !isLoading">
              <td>{{ user.person.fullName }}</td>
              <td>{{ user.login }}</td>
              <td>{{ user.person.visableName }}</td>
              <td>{{ formatedDate(user.person.dateOfBirth) }}</td>
              <td>{{ user.person.role }}</td>
            </tr>
          </tbody>
          <h2 v-if="!user && searchMade && !isLoading" class="mt-5">
            Пользователь не найден
          </h2>
          <v-dialog v-model="roleDialog" v-if="user" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-2" small v-on="on" v-bind="attrs">
                Изменить роль
              </v-btn>
            </template>

            <v-card class="pa-5">
              <v-card-title>Выберите роль</v-card-title>
              <v-divider class="mb-2"></v-divider>
              <v-form ref="changeRoleForm" v-model="isChangeRoleValid">
                <v-select
                  v-model="selectedRole"
                  :rules="roleRules"
                  placeholder="Роль"
                  :items="roles"
                  item-text="name"
                  item-value="value"
                ></v-select>

                <v-text-field
                  v-model="orgName"
                  placeholder="Имя организации"
                  :rules="orgNameRules"
                  v-if="selectedRole === 'ORGANIZER'"
                ></v-text-field>
              </v-form>
              <v-card-actions class="justify-center">
                <v-btn :disabled="!isChangeRoleValid" @click="changeRole()">
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script src="./AdminPanel.view.ts" />

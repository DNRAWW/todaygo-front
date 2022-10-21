<template>
  <div>
    <v-card :loading="isLoading" class="py-5">
      <v-card-title v-if="isEdit" class="mb-5">
        Редактирование мероприятия
      </v-card-title>
      <v-card-title v-else class="mb-5">Создание мероприятия</v-card-title>

      <v-form v-model="isFormValid" ref="form" class="mx-10">
        <v-text-field
          label="Название"
          v-model="name"
          dense
          filled
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          label="Описание"
          v-model="description"
          dense
          filled
          :rules="descriptionRules"
        ></v-text-field>
        <v-file-input
          v-model="image"
          :rules="imageRules"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon=""
          filled
          dense
          label="Картинка мероприятия"
          clearable
        ></v-file-input>
        <v-text-field
          label="Адрес"
          v-model="address"
          dense
          filled
          :rules="addressRules"
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
              label="Дата проведения"
              filled
              readonly
              :value="formatedDate(date)"
              v-on="on"
              @focus="fromDateMenu = true"
              @click="fromDateMenu = true"
              :rules="timeRules"
              dense
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            locale="ru"
            :allowed-dates="allowedDates"
            v-model="date"
            no-title
            @input="fromDateMenu = false"
          ></v-date-picker>
        </v-menu>
        <v-menu
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          ref="menu2"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Время проведения"
              readonly
              v-bind="attrs"
              v-on="on"
              @focus="menu3 = true"
              filled
              dense
              :rules="timeRules"
              clearable
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu3"
            v-model="time"
            format="24hr"
            full-width
            @click:minute="$refs.menu2.save(time)"
          ></v-time-picker>
        </v-menu>
        <v-text-field
          label="Цена"
          v-model="price"
          dense
          filled
          :rules="priceRules"
        ></v-text-field>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="duration"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          ref="menu"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="duration"
              label="Длительность"
              readonly
              v-bind="attrs"
              v-on="on"
              @focus="menu2 = true"
              filled
              dense
              clearable
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="duration"
            format="24hr"
            min="00:30"
            full-width
            @click:minute="$refs.menu.save(duration)"
          ></v-time-picker>
        </v-menu>
        <v-text-field
          label="Макс. кол-во участников"
          v-model="maxNumberOfParticipants"
          dense
          filled
          :rules="maxNumOfPartRules"
        ></v-text-field>
        <v-select
          v-model="tags"
          :items="tagsItems"
          :menu-props="{ maxHeight: '400' }"
          label="Тэги"
          multiple
          persistent-hint
          :rules="tagsRules"
          filled
          dense
          item-value="value"
          item-text="name"
        ></v-select>
        <v-flex class="d-flex justify-center mb-2">
          <v-btn :loading="isLoading" :disabled="!isFormValid" @click="save()">
            Сохранить
          </v-btn>
        </v-flex>
      </v-form>
    </v-card>
  </div>
</template>

<script src="./EventEdit.view.ts" />

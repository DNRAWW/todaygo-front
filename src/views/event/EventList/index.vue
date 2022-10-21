<template>
  <div class="px-0 py-6">
    <v-row align="center">
      <v-col cols="4" class="firstCol">
        <v-row align="center">
          <v-col>
            <v-btn
              plain
              class="font-weight-bold text-md-body-2 text-lg-h6 text-none text-decoration-underline"
              @click="
                getByDate(today, 0);
                todayButton = true;
              "
            >
              Сегодня
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              plain
              class="font-weight-bold text-md-body-2 text-lg-h6 text-none text-decoration-underline"
              @click="
                getByDate(tomorrow, 0);
                tomorrowButton = true;
              "
            >
              Завтра
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              plain
              class="font-weight-bold text-md-body-2 text-lg-h6 text-none text-decoration-underline"
              @click="getEvents(0)"
            >
              Все
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex align-center" align-items="center">
        <v-text-field
          v-model="searchQuery"
          placeholder="Поиск..."
          filled
          rounded
          dense
          hide-details
        ></v-text-field>
        <v-btn small @click="search(0)"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-col>

      <v-col lg="2" sm="3" xs="4" class="third-col d-flex justify-end">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              :small="isWindowSmall"
              class="font-weight-bold text-lg-h6 text-none text-decoration-underline"
            >
              Выбрать дату
            </v-btn>
          </template>

          <v-date-picker
            @input="getByDate(date, 0)"
            v-model="date"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <div class="ma-0 px-0 py-10">
      <v-card
        class="mb-10"
        elevation="0"
        v-for="(item, index) of events"
        :key="index"
      >
        <div class="">
          <div>
            <v-img
              class="ma-0 mx-auto"
              max-width="80%"
              min-width="200"
              min-height="400"
              max-height="300"
              :src="apiURL + item.attachment.path"
            ></v-img>
          </div>
          <div class="d-flex flex-column justify-space-around mt-2">
            <p class="text-center mb-1">
              {{ formatedDate(item.date) }} - Длительность:
              {{ getTimeString(item.duration) }}
            </p>
            <div class="d-flex justify-space-between">
              <div>
                <h1>{{ item.name }}</h1>
              </div>
            </div>
            <v-card-text tag="p" class="text-weight-bold pa-0 my-7">
              {{ item.description }}
            </v-card-text>
            <v-flex class="d-flex justify-space-between align-end">
              <v-btn
                :to="makeEventLink(item.id)"
                style="color: white"
                color="#6100FF"
                class="text-none"
              >
                Посмотреть <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-flex>
          </div>
        </div>
      </v-card>
      <v-btn
        @click="getMore(displayedEvents)"
        v-if="totalEvents > displayedEvents"
        class="d-block ma-auto"
        >Загрузить ещё</v-btn
      >
    </div>
  </div>
</template>

<script src="./EventList.view.ts" />

<style scoped>
@media (max-width: 768px) {
  .firstCol {
    display: none;
  }
}
@media (max-width: 709px) {
  .third-col {
    margin: auto !important;
    width: 100% !important;
  }
  .third-col .v-btn {
    margin: auto !important;
  }
}

@media (max-width: 425px) {
  .v-img {
    max-width: 100%;
  }
}
</style>

<template>
  <v-container class="px-0 py-6">
    <v-row align="center">
      <v-col cols="5">
        <v-row align="center">
          <v-col>
            <span
              class="font-weight-bold text-md-body-2 text-lg-h6 text-decoration-underline"
              >Сегодня</span
            >
          </v-col>
          <v-col>
            <span
              class="font-weight-bold text-md-body-2 text-lg-h6 text-md text-decoration-underline"
              >Завтра</span
            >
          </v-col>
          <v-col>
            <span
              class="font-weight-bold text-md-body-2 text-lg-h6 text-decoration-underline"
              >Выходные</span
            >
          </v-col>
          <v-col>
            <span
              class="font-weight-bold text-md-body-2 text-lg-h6 text-decoration-underline"
              >Неделя</span
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col align-items="center" cols="5">
        <v-text-field
          placeholder="Поиск..."
          filled
          rounded
          dense
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              class="font-weight-bold text-lg-h6 text-none text-decoration-underline"
            >
              Выбрать дату
            </v-btn>
          </template>

          <v-date-picker></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-container class="ma-0 px-0 py-10">
      <v-card
        class="mb-10"
        elevation="0"
        v-for="(item, index) of events"
        :key="index"
      >
        <v-row>
          <v-col cols="6" class="pa-0 mr-10 ma-auto">
            <v-img
              class="ma-0"
              max-width="700"
              min-width="200"
              min-height="400"
              src="../../../assets/event_image.png"
            ></v-img>
          </v-col>
          <v-col>
            <v-row align="center">
              <v-col>
                <h1>{{ item.name }}</h1>
              </v-col>
              <v-col class="d-flex justify-center">
                <p class="ma-0">
                  Длительность: {{ getTimeString(item.duration) }}
                </p>
              </v-col>
            </v-row>
            <v-card-text tag="p" class="text-weight-bold pa-0 mt-7">
              {{ item.description }}
            </v-card-text>
            <v-flex class="d-flex justify-space-between mt-16">
              <p>{{ formatedDate(item.date) }}</p>
              <v-btn
                :to="makeEventLink(item.id)"
                style="color: white"
                color="#6100FF"
                class="text-none"
              >
                Посмотреть <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-flex>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-container>
</template>

<script src="./EventList.view.ts"></script>

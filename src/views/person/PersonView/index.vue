<template>
  <div>
    <v-card v-if="!person" class="user-info text-center mb-10 py-10">
      <h1>Нет данных</h1>
    </v-card>
    <v-card v-else class="user-info pa-5 mb-10 rounded-lg">
      <v-row>
        <v-col>
          <v-layout row wrap class="justify-space-between">
            <h1 class="fullName">{{ person.fullName }}</h1>
            <v-btn
              v-if="personId == id"
              width="50"
              height="50"
              fab
              @click="makeEditLink()"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-layout>
          <v-card-title class="pa-0 ml-2 mt-5">
            {{ person.orgName }}
          </v-card-title>
          <v-card-title class="pa-0 ml-2 mt-5">
            {{ person.visableName }}
          </v-card-title>
        </v-col>
      </v-row>
    </v-card>

    <v-card
      v-if="person && person.orgName"
      class="user-info pa-8 mb-5 rounded-lg"
    >
      <v-layout row wrap class="justify-space-between mb-8">
        <h2>Мероприятия</h2>

        <v-btn v-if="id == personId">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-layout>
      <v-row v-if="events.length < 1">
        <v-col class="text-center">
          <h1>Нет мероприятий</h1>
        </v-col>
      </v-row>

      <v-layout v-else row wrap class="mt-5">
        <v-card
          v-for="(item, index) of events"
          :key="index"
          cols="4"
          class="pa-5 ma-auto mb-10"
          :to="makeEventLink(item.id)"
          link
        >
          <v-img
            max-height="300"
            max-width="300"
            src="../../../assets/event_image.png"
          ></v-img>
          <v-card-text class="pa-0">
            {{ formatedDate(item.date) }}
          </v-card-text>
          <v-card-title class="pa-0">Очень крутое мероприятие</v-card-title>
        </v-card>
      </v-layout>

      <v-btn
        @click="getEvents(eventsDisplayed)"
        v-if="totalEvents > eventsDisplayed"
        class="d-block ma-auto"
      >
        Загрузить ещё
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped>
.fullName {
  color: #ff4242;
}
.user-info {
  background: rgba(97, 0, 255, 0.1) !important;
}
</style>

<script src="./PersonView.view.ts" />

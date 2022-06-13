<template>
  <v-container>
    <v-card v-if="event" class="mb-10 pa-5 rounded-lg">
      <v-flex>
        <v-btn
          color="#FF4242"
          fab
          class="mr-3"
          v-if="role === 'ADMIN' || personId === event.organizerId"
          @click="deleteEvent()"
          width="50"
          height="50"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-btn
          v-if="personId == event.organizerId"
          width="50"
          height="50"
          fab
          :to="makeEditLink()"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </v-flex>

      <v-card-title>Очень крутое мероприятие</v-card-title>

      <v-row class="mt-5">
        <v-col class="pt-0">
          <v-img
            class="ma-auto"
            aspect-ratio="1"
            max-height="300"
            max-width="500"
            min-width="200"
            src="../../../assets/event_image.png"
          ></v-img>
        </v-col>
        <v-col>
          <v-row align="center" class="mb-5">
            <v-col class="rounded-pill organizer text-center" v-if="orgName">
              <router-link
                class="organizer__link"
                :to="makeOrgLink(event.organizerId)"
                >{{ orgName }}</router-link
              >
            </v-col>
            <v-col class="rounded-pill organizer text-center" v-else>
              Аноним
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="col__info rounded-pill">
              {{ event.address }}
            </v-col>
            <v-col class="col__info rounded-pill">
              <v-icon>mdi-progress-clock</v-icon>
              {{ getTimeString(event.duration) }}
            </v-col>
            <v-col class="col__info rounded-pill">
              <v-icon>mdi-calendar</v-icon> {{ formatedDate(event.date) }}
            </v-col>
          </v-row>
          <v-row align="center" class="mt-8">
            <v-col class="col__info rounded-pill">
              <v-icon>mdi-cash</v-icon> {{ event.price / 100 }} &#8381;
            </v-col>
            <v-col class="col__info rounded-pill">
              Макс. участников: {{ event.maxNumberOfParticipants }}
            </v-col>
            <v-col class="col__info rounded-pill">
              Идёт {{ event.numberOfParticipants }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="mt-8"></v-divider>
      <v-divider></v-divider>

      <v-row class="mt-8">
        <v-col>
          <p>
            {{ event.description }}
          </p>
        </v-col>
      </v-row>

      <div class="mt-5" v-if="personId">
        <v-btn @click="participate()" color="success" v-if="!participating">
          Пойду
        </v-btn>
        <v-btn @click="notParticipate()" color="#FF4242" v-else>
          Не пойду
        </v-btn>
      </div>
    </v-card>

    <v-card v-else class="pa-5 rounded-lg">
      <v-row>
        <v-col class="text-center">
          <h1>Нет данных</h1>
        </v-col>
      </v-row>
    </v-card>

    <v-card v-if="event" class="pa-5 rounded-lg">
      <v-card-title>Комментарии</v-card-title>
      <v-form
        @submit="saveComment"
        @submit.prevent
        v-if="visibleName"
        v-model="isCommentValid"
        ref="commentForm"
      >
        <v-text-field
          placeholder="Комментарий..."
          :rules="commentRules"
          v-model="commentText"
          filled
          dense
        ></v-text-field>
        <v-btn
          @click="saveComment()"
          class="d-block ma-auto"
          :disabled="!isCommentValid"
          >Отправить</v-btn
        >
      </v-form>

      <v-divider class="mt-5"></v-divider>
      <v-divider class="mb-5"></v-divider>

      <v-card
        v-for="(item, index) of comments"
        :key="index"
        class="rounded-lg mb-5"
      >
        <v-flex class="d-flex align-center justify-space-between">
          <v-card-title>
            {{ item.comment.person.visableName }}
          </v-card-title>
          <v-btn
            color="#FF4242"
            fab
            class="mr-3"
            v-if="
              item.comment.person.visableName == visibleName || role === 'ADMIN'
            "
            @click="deleteComment(index)"
            width="50"
            height="50"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </v-flex>

        <v-card-text>
          {{ item.comment.text }}
        </v-card-text>
      </v-card>

      <p class="text-center" v-if="totalComments === 0">Комментариев ещё нет</p>

      <v-btn
        @click="getComments(displayedComments)"
        v-if="totalComments > displayedComments"
        class="d-block ma-auto"
        >Загрузить ещё</v-btn
      >
    </v-card>
  </v-container>
</template>

<style scoped>
.col__info {
  background-color: rgba(255, 66, 66, 0.1);
  margin-right: 8px;
  text-align: center;
}
.organizer {
  background-color: #efefef;
}
.organizer__link {
  color: #6100ff;
}
</style>

<script src="./EventView.view.ts" />

import Component from "vue-class-component";
import Vue from "vue";
import { TEvent } from "../EventList/types";
import axios from "axios";
import moment from "moment";
import {
  CreateCommentResponse,
  GetCommentsResponse,
  GetOneEvent,
  GetOneOrg,
  TComment,
} from "./types";
import { EVENT_EDIT, PERSON_VIEW } from "@/router/routes";
import { baseURL } from "../../../main";
@Component({})
export class EventView extends Vue {
  protected apiURL = baseURL;
  protected dialog = false;
  protected event: TEvent | null = null;
  protected orgName: string | null = "";
  protected eventId = this.$route.params.id;
  protected isCommentValid = false;
  protected commentRules = [
    (v: string) => !!v || "Обязательное поле",
    (v: string) =>
      (v && v.length > 4) || "Комментарий должен быть длиннее 4 символов",
    (v: string) =>
      (v && v.length <= 200) || "Комментарий не может превышать 200 символов",
  ];
  protected comments: TComment[] = [];
  protected totalComments = 0;
  protected commentText: string | null = null;
  protected displayedComments = 0;
  $refs!: {
    commentForm: HTMLFormElement;
  };
  protected participating = false;

  protected get visibleName() {
    return this.$store.getters.visibleName;
  }
  protected get role() {
    return this.$store.getters.role;
  }
  protected get personId() {
    return this.$store.getters.personId;
  }

  private async mounted() {
    await this.getEvent();
    if (this.event) {
      await this.getOrg(this.event.organizerId);
      await this.getComments(0);
      await this.checkParticipation();
    }
  }

  protected async getOrg(id: number) {
    try {
      const organizer: GetOneOrg = await axios.get(`/people/get-one/${id}`);

      this.orgName = organizer.data.orgName;
    } catch {
      return;
    }
  }

  protected async getComments(skip: number) {
    try {
      const comments: GetCommentsResponse = await axios.get(
        `/comments/get-all/${this.eventId}/${skip}`
      );

      if (comments.data.count > 0) {
        this.comments.push(...comments.data.data);
        this.totalComments = comments.data.count;
        this.displayedComments += 15;
        return;
      }
    } catch {
      return;
    }
  }

  protected async getEvent(): Promise<void> {
    try {
      const event: GetOneEvent = await axios.get(
        `/events/get-one/${this.eventId}`
      );

      if (event) {
        this.event = event.data;
      }
    } catch {
      return;
    }

    return;
  }

  protected async saveComment() {
    if (!this.commentText) {
      return;
    }

    try {
      const comment: CreateCommentResponse = await axios.post(
        "/comments/create",
        {
          text: this.commentText,
          eventId: this.eventId,
        }
      );

      this.comments?.unshift({
        comment: {
          id: comment.data,
          person: {
            id: this.personId,
            visableName: this.visibleName,
          },
          text: this.commentText,
        },
      });

      this.totalComments++;
      this.displayedComments++;
      this.$refs.commentForm.reset();
    } catch {
      return;
    }
  }

  protected async deleteComment(index: number) {
    try {
      await axios.post("/comments/delete", {
        id: this.comments[index].comment.id,
      });

      this.comments.splice(index, 1);
      this.displayedComments -= 1;
      this.totalComments -= 1;
    } catch {
      return;
    }
  }

  protected async deleteEvent() {
    try {
      await axios.post("/events/delete", {
        id: this.eventId,
      });

      window.location.href = "/";
    } catch {
      return;
    }
  }

  protected async participate() {
    if (!this.event) {
      return;
    }
    try {
      await axios.post("/events/participate", {
        eventId: this.eventId,
      });
      this.participating = true;
      this.event.numberOfParticipants++;
    } catch {
      return;
    }
  }
  protected async notParticipate() {
    if (!this.event) {
      return;
    }
    try {
      await axios.post("/events/not-participate", {
        eventId: this.eventId,
      });
      this.participating = false;
      this.event.numberOfParticipants--;
    } catch {
      return;
    }
  }

  protected async checkParticipation() {
    try {
      const participation: { data: boolean } = await axios.get(
        `/events/check-participation/${this.eventId}`
      );

      this.participating = participation.data;
    } catch {
      return;
    }
  }

  protected formatedDate(unformatedDate: Date): string {
    const date = new Date(unformatedDate);
    const result =
      date.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) +
      " " +
      date.toLocaleDateString("ru");

    return result;
  }

  protected getTimeString(duration: number): string {
    function numTime(
      value: number,
      words: [string, string, string]
    ): string | null {
      value = Math.abs(value) % 100;
      const num = value % 10;
      if (value === 0) {
        return null;
      }
      if (value > 10 && value < 20) {
        return `${value} ${words[2]}`;
      }
      if (num > 1 && num < 5) {
        return `${value} ${words[1]}`;
      }
      if (num == 1) {
        return `${value} ${words[0]}`;
      }
      return `${value} ${words[2]}`;
    }

    const time = moment.utc(duration * 1000);
    const hours = numTime(+time.format("HH"), ["час", "часа", "часов"]);
    const minutes = numTime(+time.format("m"), ["минута", "минуты", "минут"]);
    return [hours, minutes].filter(Boolean).join(", ");
  }

  protected makeOrgLink(id: number) {
    return {
      name: PERSON_VIEW,
      params: {
        id: id,
      },
    };
  }

  protected makeEditLink() {
    return {
      name: EVENT_EDIT,
      params: {
        id: this.eventId,
      },
    };
  }

  protected makePersonLink(comment: TComment) {
    return {
      name: PERSON_VIEW,
      params: {
        id: comment.comment.person.id,
      },
    };
  }

  private listenerKeyDown(e: KeyboardEvent) {
    if (e.key == "Enter") {
      this.saveComment();
    }
  }
}

export default EventView;

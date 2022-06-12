import { EVENT_VIEW, PROFILE_EDIT } from "@/router/routes";
import { GetAllEventsResponse, TEvent } from "@/views/event/EventList/types";
import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import { GetPerson, TPerson } from "./types";

@Component({})
export class PersonView extends Vue {
  protected id = this.$route.params.id;
  protected person: TPerson | null = null;
  protected events: TEvent[] = [];
  protected eventsDisplayed = 0;
  protected totalEvents = 0;
  protected get personId() {
    return this.$store.getters.personId;
  }
  protected get role() {
    return this.$store.getters.role;
  }
  protected componentKey = 0;

  private created() {
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        if (toParams != previousParams) {
          this.id = toParams.id;
          this.person = null;
          const newPerson = await this.getPerson();

          if (newPerson && newPerson.orgName) {
            await this.getEvents(0);
          }
        }
      }
    );
  }

  private async mounted() {
    await this.getPerson();
    if (this.person && this.person.orgName) {
      await this.getEvents(0);
    }
  }

  private async getEvents(skip: number) {
    try {
      const events: GetAllEventsResponse = await axios.get(
        `events/get-all-by-org/${this.id}/${skip}`
      );

      this.events.push(...events.data.data);
      this.totalEvents = events.data.count;
      this.eventsDisplayed += 10;
    } catch {
      return;
    }
  }

  protected async getPerson() {
    try {
      const person: GetPerson = await axios.get(`/people/get-one/${this.id}`);

      this.person = person.data;

      return person.data;
    } catch {
      return;
    }
  }

  protected makeEventLink(id: number) {
    return {
      name: EVENT_VIEW,
      params: {
        id: id,
      },
    };
  }
  protected makeEditLink() {
    return {
      name: PROFILE_EDIT,
    };
  }

  protected formatedDate(unformatedDate: Date): string {
    const date = new Date(unformatedDate);
    const result =
      date.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) +
      " " +
      date.toLocaleDateString("ru");

    return result;
  }
}

export default PersonView;

import { EVENT_VIEW, LOGIN, SIGNUP } from "@/router/routes";
import axios, { AxiosResponse } from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import { GetAllEventsResponse, TEvent } from "./types";

@Component({})
export class EventList extends Vue {
  protected events: TEvent[] = [];
  private async mounted() {
    this.getEvents();
    return;
  }
  private async getEvents() {
    const events: GetAllEventsResponse = await axios.get("events/get-all/0");
    this.events.push(...events.data.data);
  }
  protected getTimeString(time: number): string {
    if (time / 59 > 60) {
      return (time / 60 / 60).toFixed(2) + " ч";
    }

    return (time / 60).toFixed(2) + " мин";
  }
  protected formatedDate(unformatedDate: Date): string {
    const date = new Date(unformatedDate);
    const result =
      date.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) +
      " " +
      date.toLocaleDateString("ru");

    return result;
  }
  protected makeEventLink(id: number) {
    return {
      name: EVENT_VIEW,
      params: {
        id: id,
      },
    };
  }
}

export default EventList;

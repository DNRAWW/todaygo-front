import { EVENT_VIEW } from "@/router/routes";
import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { GetAllEventsResponse, TEvent } from "./types";
import { baseURL } from "../../../main";

@Component({})
export class EventList extends Vue {
  protected date: Date | null = null;
  protected today = "";
  protected tomorrow = "";
  protected selectedDate = "";
  protected searchQuery = "";
  protected apiURL = baseURL;
  protected isWindowSmall =
    window.screen.width <= 768 && window.screen.width > 632;

  protected displayedEvents = 0;
  protected totalEvents = 0;

  protected get currentCityId() {
    return this.$store.getters.currentCityId;
  }
  protected get currentCity() {
    return this.$store.getters.currentCity;
  }

  protected events: TEvent[] = [];
  private async mounted() {
    this.tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0];
    this.today = new Date().toISOString().split("T")[0];

    await this.getEvents(0);
    return;
  }

  private async getEvents(skip: number) {
    const events: GetAllEventsResponse = await axios.get(
      `events/get-all/${this.currentCityId}/${skip}`
    );
    if (skip === 0) {
      this.events = events.data.data;
      this.totalEvents = events.data.count;
      this.displayedEvents = 10;
      this.searchQuery = "";
      this.selectedDate = "";
    } else {
      this.events.push(...events.data.data);
      this.totalEvents = events.data.count;
      this.displayedEvents += 10;
    }
  }

  protected async getByDate(date: string, skip: number) {
    try {
      const events: GetAllEventsResponse = await axios.get(
        "events/get-by-date",
        {
          params: {
            date: date,
            skip: skip,
            cityId: this.currentCityId,
          },
        }
      );

      if (skip === 0) {
        this.events = events.data.data;
        this.totalEvents = events.data.count;
        this.displayedEvents = 10;
        this.searchQuery = "";
        this.selectedDate = date;
      } else {
        this.events.push(...events.data.data);
        this.totalEvents = events.data.count;
        this.displayedEvents += 10;
      }
    } catch {
      await this.getEvents(0);
      return;
    }
  }

  protected async search(skip: number) {
    const events: GetAllEventsResponse = await axios.get("events/get-by-name", {
      params: {
        query: this.searchQuery,
        skip: skip,
        cityId: this.currentCityId,
      },
    });

    if (skip === 0) {
      this.events = events.data.data;
      this.totalEvents = events.data.count;
      this.displayedEvents = 10;
      this.selectedDate = "";
    } else {
      this.events.push(...events.data.data);
      this.totalEvents = events.data.count;
      this.displayedEvents += 10;
    }
  }

  protected async getMore(skip: number) {
    if (this.searchQuery) {
      await this.search(skip);
      return;
    }
    if (this.selectedDate) {
      await this.getByDate(this.selectedDate, skip);
      return;
    } else {
      await this.getEvents(skip);
      return;
    }
  }

  protected getTimeString(time: number): string {
    if (time / 60 > 59) {
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

  @Watch("currentCityId")
  private async newCurrentCityId(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      await this.getEvents(0);
    }
  }

  protected unWatchCurrentCityId!: () => void;
  private created() {
    this.unWatchCurrentCityId = this.$store.watch(
      (state) => state.currentCity,
      async (newValue, oldValue) => {
        console.log(newValue);
        if (newValue !== oldValue) {
          await this.getEvents(0);
        }
      },
      {
        deep: true,
      }
    );
  }
  private destroyed() {
    this.unWatchCurrentCityId();
  }
}

export default EventList;

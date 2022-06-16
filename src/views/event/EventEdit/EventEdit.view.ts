import { EVENT_CREATE } from "@/router/routes";
import { GetAllCititesResponse, TCity } from "@/views/wrapper/types";
import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import { GetOneEvent } from "../EventView/types";

@Component({})
export class EventEdit extends Vue {
  protected isFormValid = false;
  // Inputs
  protected name: string | null = null;
  protected description: string | null = null;
  protected address: string | null = null;
  protected date: string | null = null;
  protected price: number | null = null;
  protected duration: string | null = null;
  protected maxNumberOfParticipants: number | null = null;
  protected tags: string[] = [];
  protected time = "";
  protected stringDate = "";
  protected cityId: number | null = null;

  protected dateToString(date: Date) {
    this.stringDate = <string>this.formatedDate(date);
  }

  protected allowedDates = (v: string) =>
    new Date(v).getTime() >=
    new Date(new Date().toISOString().split("T")[0]).getTime();
  protected get personId() {
    return this.$store.getters.personId;
  }

  protected cities: TCity[] = [];

  protected nameRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) => (v && v.length <= 50) || "Не должено превышать 50 символов",
    (v: string) => (v && v.length >= 3) || "Должно быть больше 2 символов",
  ];

  protected isDescriptionEmpty() {
    if (!this.description || this.description.length < 1) {
      return true;
    }
    return false;
  }

  protected descriptionRules = [
    (v: string) =>
      this.isDescriptionEmpty() ||
      v.length <= 500 ||
      "Не должено превышать 500 символов",
    (v: string) =>
      this.isDescriptionEmpty() ||
      v.length >= 5 ||
      "Должно быть больше 4 символов",
  ];

  protected addressRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      (v && v.length <= 300) || "Не должено превышать 300 символов",
    (v: string) => (v && v.length >= 20) || "Должно быть больше 19 символов",
  ];

  protected priceRules = [
    (v: number) => !!v || "Поле обязательно для заполнения",
    (v: number) => (v && v >= 0) || "Цена не может быть меньше 0",
    (v: number) => (v && v < 100000) || "Слишком дорого :)",
  ];

  protected maxNumOfPartRules = [
    (v: number) => !!v || "Поле обязательно для заполнения",
    (v: number) => (v && v >= 10) || "Не может быть меньше 10",
    (v: number) => (v && v < 100000) || "Слишком много :)",
  ];

  protected timeRules = [
    (v: number) => !!v || "Поле обязательно для заполнения",
  ];

  private tagsLength() {
    return this.tags.length > 0;
  }

  protected tagsRules = [
    () => this.tagsLength() || "Поле обязательно для заполнения",
  ];

  protected cityRules = [
    (v: number) => !!v || "Поле обязательно для заполнения",
  ];

  protected tagsItems = [
    { name: "Образовательное", value: "EDUCATIONAL" },
    { name: "Развлекательное", value: "ENTERTAINMENT" },
    { name: "Культурное", value: "CULTURAL" },
  ];

  protected fromDateMenu = false;
  protected menu2 = false;
  protected menu3 = false;
  protected isLoading = false;
  protected get isEdit(): boolean {
    return this.$route.name !== EVENT_CREATE;
  }

  protected async getCities() {
    const cities: GetAllCititesResponse = await axios.get("cities/get-all");

    this.cities = cities.data;

    return;
  }

  private async mounted() {
    await this.getCities();
    this.isLoading = true;
    if (this.isEdit) {
      await this.getEvent(parseInt(this.$route.params.id));
    }
    this.isLoading = false;
    return;
  }

  protected formatedDate(unformatedDate: Date | null) {
    if (!unformatedDate) {
      return;
    }
    const date = new Date(unformatedDate);
    const result = date.toLocaleDateString("ru");

    return result;
  }

  private timeStringToSeconds(timeString: string) {
    const time = timeString.split(":");
    const hours = parseInt(time[0]) * 3600;
    const minutes = parseInt(time[1]) * 60;

    return hours + minutes;
  }

  protected async save() {
    if (!this.date) {
      return;
    }
    if (!this.duration) {
      return;
    }
    if (!this.price) {
      return;
    }
    this.isLoading = true;
    if (this.isEdit) {
      await axios.post("/events/change", {
        id: this.$route.params.id,
        name: this.name,
        maxNumberOfParticipants: this.maxNumberOfParticipants,
        tags: this.tags,
        description: this.description,
        price: this.price * 100,
        address: this.address,
        date: this.date + "T" + this.time,
        duration: this.timeStringToSeconds(this.duration),
        cityId: this.cityId,
      });

      this.isLoading = false;
      window.location.href = `/person/${this.personId}`;

      return;
    }

    await axios.post("/events/create", {
      name: this.name,
      maxNumberOfParticipants: this.maxNumberOfParticipants,
      tags: this.tags,
      description: this.description,
      price: this.price * 100,
      address: this.address,
      date: this.date + "T" + this.time,
      duration: this.timeStringToSeconds(this.duration),
      cityId: this.cityId,
    });

    window.location.href = `/person/${this.personId}`;

    return;
  }

  private secondsToTime(duration: number) {
    const minutes = Math.floor((duration / 60) % 60),
      hours = Math.floor((duration / (60 * 60)) % 24);

    const hoursString = hours < 10 ? "0" + hours : hours;
    const minutesString = minutes < 10 ? "0" + minutes : minutes;

    return hoursString + ":" + minutesString;
  }

  protected async getEvent(id: number) {
    try {
      const event: GetOneEvent = await axios.get(`/events/get-one/${id}`);

      if (event) {
        this.name = event.data.name;
        this.address = event.data.address;
        this.description = event.data.description;
        this.date = event.data.date.split("T")[0];
        this.time = new Date(event.data.date).toLocaleTimeString("ru", {
          hour: "2-digit",
          hourCycle: "h23",
          minute: "2-digit",
        });
        this.price = event.data.price / 100;
        this.duration = this.secondsToTime(event.data.duration);
        this.maxNumberOfParticipants = event.data.maxNumberOfParticipants;
        this.tags = event.data.tags;
        this.dateToString(new Date(event.data.date));
        this.cityId = event.data.city.id;
      }
    } catch {
      window.location.href = `/person/${this.personId}`;
    }

    return;
  }
}

export default EventEdit;

export type T_lecture = {
  id: number,

  title: string,
  date: string,
  image: string,

  category: number | undefined,
  description: string,
  theme: string,
  time: number,
  difficulty: number,
  motivators: number[],

  thumbs: string[],
};

export type T_category = {
  id: number,

  title: string,
  thumb: string,
  lectures: T_lecture[],
};

export type T_motivator = {
  id: number,
  
  name_kor: string,
  name_eng: string,
  description: string,
  expertise: string,
  image: string,
  image_thumb: string,
  lectures: T_lecture[],
};

export const SETTINGS = {
	REST_URL: "http://52.79.124.70:7231",
}
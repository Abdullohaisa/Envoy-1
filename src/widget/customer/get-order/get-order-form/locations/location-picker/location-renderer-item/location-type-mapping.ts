export const locationTypeMapping: Record<string, string> = {
  // Shahar / hudud
  locality: "locality",
  town: "locality",
  city: "locality",
  district: "locality",
  viloyat: "locality",
  tuman: "locality",
  shahri: "locality",

  // Maktab, litsey, kollej
  maktab: "school",
  litsey: "school",
  kollej: "school",
  gymnasium: "school",
  primaryschool: "school",
  secondaryschool: "school",
  "o'rta maktab": "school",
  "litsey maktab": "school",

  // Universitet, institut, akademiya, oliy ta'lim
  universitet: "university",
  institut: "university",
  akademiya: "university",
  "oliy ta'lim": "university",
  "davlat universiteti": "university",
  "xususiy universitet": "university",
  "davlat institut": "university",
  "xususiy institut": "university",
  "davlat akademiya": "university",
  "xususiy akademiya": "university",

  // Shifoxona, klinika, poliklinika, tibbiyot markazi
  shifoxona: "hospital",
  klinika: "hospital",
  poliklinika: "hospital",
  "tibbiyot markazi": "hospital",
  "xususiy klinika": "hospital",
  "davlat shifoxonasi": "hospital",
  "xususiy poliklinika": "hospital",
  "davlat poliklinika": "hospital",

  // Do‘kon, supermarket, magazin, savdo markazi
  "do'kon": "store",
  dokon: "store",
  magazin: "store",
  supermarket: "store",
  "savdo markazi": "store",
  "xususiy do'kon": "store",
  "davlat do'kon": "store",
  shop: "store",
  store: "store",

  // Zavod, fabrika, ishlab chiqarish
  zavod: "factory",
  fabrika: "factory",
  factory: "factory",
  "ishlab chiqarish": "factory",
  plant: "factory",
  enterprise: "factory",

  // Restoran, kafe, bar
  restoran: "restaurant",
  cafe: "restaurant",
  kafe: "restaurant",
  bar: "restaurant",
  "fast food": "restaurant",
  "coffee shop": "restaurant",
};

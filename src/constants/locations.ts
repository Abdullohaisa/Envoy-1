export const mamlakatlar = [
  { id: "01", name: "O‘zbekiston" },
  { id: "02", name: "Qozog‘iston" },
  { id: "03", name: "Qirg‘iziston" },
  { id: "04", name: "Tojikiston" },
  { id: "05", name: "Turkmaniston" },
];

export const viloyatlar: Record<string, { id: string; name: string }[]> = {
  "01": [
    // O‘zbekiston
    { id: "0101", name: "Toshkent shahri" },
    { id: "0102", name: "Toshkent viloyati" },
    { id: "0103", name: "Andijon" },
    { id: "0104", name: "Buxoro" },
    { id: "0105", name: "Farg‘ona" },
    { id: "0106", name: "Jizzax" },
    { id: "0107", name: "Xorazm" },
    { id: "0108", name: "Namangan" },
    { id: "0109", name: "Navoiy" },
    { id: "0110", name: "Qashqadaryo" },
    { id: "0111", name: "Qoraqalpog‘iston Respublikasi" },
    { id: "0112", name: "Samarqand" },
    { id: "0113", name: "Sirdaryo" },
    { id: "0114", name: "Surxondaryo" },
  ],
};

export const shaharlar: Record<string, { id: string; name: string }[]> = {
  "0102": [
    { id: "010201", name: "Chirchiq" },
    { id: "010202", name: "Angren" },
    { id: "010203", name: "Bekobod" },
    { id: "010204", name: "Olmaliq" },
    { id: "010205", name: "Nurafshon" },
  ],
  "0103": [
    { id: "010301", name: "Andijon shahri" },
    { id: "010302", name: "Asaka" },
    { id: "010303", name: "Xonobod" },
    { id: "010304", name: "Shahrixon" },
    { id: "010305", name: "Qo‘rg‘ontepa" },
  ],
  "0104": [
    { id: "010401", name: "Buxoro shahri" },
    { id: "010402", name: "G‘ijduvon" },
    { id: "010403", name: "Kogon" },
    { id: "010404", name: "Qorako‘l" },
  ],
  "0105": [
    { id: "010501", name: "Farg‘ona shahri" },
    { id: "010502", name: "Qo‘qon" },
    { id: "010503", name: "Marg‘ilon" },
    { id: "010504", name: "Quva" },
    { id: "010505", name: "Rishton" },
  ],
  "0106": [
    { id: "010601", name: "Jizzax shahri" },
    { id: "010602", name: "Paxtakor" },
    { id: "010603", name: "G‘allaorol" },
    { id: "010604", name: "Zarbdor" },
  ],
  "0107": [
    { id: "010701", name: "Urganch" },
    { id: "010702", name: "Xiva" },
    { id: "010703", name: "Pitnak" },
    { id: "010704", name: "Gurlan" },
  ],
  "0108": [
    { id: "010801", name: "Namangan shahri" },
    { id: "010802", name: "Chortoq" },
    { id: "010803", name: "Chust" },
    { id: "010804", name: "Kosonsoy" },
  ],
  "0109": [
    { id: "010901", name: "Navoiy shahri" },
    { id: "010902", name: "Zarafshon" },
    { id: "010903", name: "Uchquduq" },
    { id: "010904", name: "Karmana" },
  ],
  "0110": [
    { id: "011001", name: "Qarshi" },
    { id: "011002", name: "Kitob" },
    { id: "011003", name: "Shahrisabz" },
    { id: "011004", name: "Koson" },
  ],
  "0111": [
    { id: "011101", name: "Nukus" },
    { id: "011102", name: "Xo‘jayli" },
    { id: "011103", name: "Taxiatosh" },
    { id: "011104", name: "Beruniy" },
  ],
  "0112": [
    { id: "011201", name: "Samarqand shahri" },
    { id: "011202", name: "Kattaqo‘rg‘on" },
    { id: "011203", name: "Urgut" },
    { id: "011204", name: "Bulung‘ur" },
  ],
  "0113": [
    { id: "011301", name: "Guliston" },
    { id: "011302", name: "Sirdaryo shahri" },
    { id: "011303", name: "Yangiyer" },
  ],
  "0114": [
    { id: "011401", name: "Termiz" },
    { id: "011402", name: "Denov" },
    { id: "011403", name: "Boysun" },
    { id: "011404", name: "Sherobod" },
  ],
};

export const tumanlar: Record<string, { id: string; name: string }[]> = {
  // Chirchiq
  "010201": [
    { id: "01020101", name: "Chirchiq tumani markazi" },
    { id: "01020102", name: "Chinoz tumani" },
    { id: "01020103", name: "Quyi Chirchiq tumani" },
    { id: "01020104", name: "O‘rtachirchiq tumani" },
    { id: "01020105", name: "Yuqori Chirchiq tumani" },
  ],

  // Angren
  "010202": [
    { id: "01020201", name: "Angren tumani markazi" },
    { id: "01020202", name: "Toshtemir tumani" },
    { id: "01020203", name: "Ohangaron tumani" },
  ],

  // Bekobod
  "010203": [
    { id: "01020301", name: "Bekobod tumani markazi" },
    { id: "01020302", name: "Oqqo‘rg‘on tumani" },
    { id: "01020303", name: "Parkent tumani" },
    { id: "01020304", name: "Piskent tumani" },
  ],

  // Olmaliq
  "010204": [
    { id: "01020401", name: "Olmaliq tumani markazi" },
    { id: "01020402", name: "Zangiota tumani" },
    { id: "01020403", name: "Yangiyo‘l tumani" },
  ],

  // Nurafshon
  "010205": [
    { id: "01020501", name: "Nurafshon tumani markazi" },
    { id: "01020502", name: "Qibray tumani" },
  ],

  "010301": [
    { id: "01030101", name: "Andijon tumani markazi" },
    { id: "01030102", name: "Asaka tumani" },
    { id: "01030103", name: "Baliqchi tumani" },
    { id: "01030104", name: "Bo‘z tumani" },
    { id: "01030105", name: "Buloqboshi tumani" },
    { id: "01030106", name: "Izboskan tumani" },
    { id: "01030107", name: "Jalaquduq tumani" },
    { id: "01030108", name: "Marhamat tumani" },
    { id: "01030109", name: "Oltinko‘l tumani" },
    { id: "01030110", name: "Paxtaobod tumani" },
    { id: "01030111", name: "Qo‘rg‘ontepa tumani" },
    { id: "01030112", name: "Shahrixon tumani" },
    { id: "01030113", name: "Ulug‘nor tumani" },
    { id: "01030114", name: "Xo‘jaobod tumani" },
  ],

  // Asaka
  "010302": [
    { id: "01030201", name: "Asaka tumani markazi" },
    { id: "01030202", name: "Marhamat tumani" },
    { id: "01030203", name: "Qo‘rg‘ontepa tumani" },
  ],

  // Xonobod
  "010303": [
    { id: "01030301", name: "Xonobod tumani markazi" },
    { id: "01030302", name: "Andijon tumani" },
    { id: "01030303", name: "Bo‘z tumani" },
  ],

  // Shahrixon
  "010304": [
    { id: "01030401", name: "Shahrixon tumani markazi" },
    { id: "01030402", name: "Paxtaobod tumani" },
    { id: "01030403", name: "Ulug‘nor tumani" },
  ],

  // Qo‘rg‘ontepa
  "010305": [
    { id: "01030501", name: "Qo‘rg‘ontepa tumani markazi" },
    { id: "01030502", name: "Baliqchi tumani" },
    { id: "01030503", name: "Izboskan tumani" },
  ],

  // Buxoro shahri
  "010401": [
    { id: "01040101", name: "Buxoro tumani markazi" },
    { id: "01040102", name: "Jondor tumani" },
    { id: "01040103", name: "Olot tumani" },
    { id: "01040104", name: "Peshku tumani" },
    { id: "01040105", name: "Shofirkon tumani" },
    { id: "01040106", name: "Vobkent tumani" },
    { id: "01040107", name: "Romitan tumani" },
    { id: "01040108", name: "Qorako‘l tumani" },
    { id: "01040109", name: "Qorovulbozor tumani" },
    { id: "01040110", name: "Kogon tumani" },
  ],

  // G‘ijduvon
  "010402": [
    { id: "01040201", name: "G‘ijduvon tumani markazi" },
    { id: "01040202", name: "Buxoro tumani" },
    { id: "01040203", name: "Romitan tumani" },
  ],

  // Kogon
  "010403": [
    { id: "01040301", name: "Kogon tumani markazi" },
    { id: "01040302", name: "Olot tumani" },
    { id: "01040303", name: "Shofirkon tumani" },
  ],

  // Qorako‘l
  "010404": [
    { id: "01040401", name: "Qorako‘l tumani markazi" },
    { id: "01040402", name: "Vobkent tumani" },
    { id: "01040403", name: "Peshku tumani" },
  ],

  // Farg‘ona shahri
  "010501": [
    { id: "01050101", name: "Farg‘ona tumani markazi" },
    { id: "01050102", name: "Oltiariq tumani" },
    { id: "01050103", name: "Yozyovon tumani" },
    { id: "01050104", name: "Quva tumani" },
    { id: "01050105", name: "Bag‘dod tumani" },
    { id: "01050106", name: "Buvayda tumani" },
    { id: "01050107", name: "Rishton tumani" },
    { id: "01050108", name: "Dang‘ara tumani" },
    { id: "01050109", name: "Beshariq tumani" },
    { id: "01050110", name: "So‘x tumani" },
    { id: "01050111", name: "Toshloq tumani" },
    { id: "01050112", name: "Furqat tumani" },
    { id: "01050113", name: "Qo‘shtepa tumani" },
    { id: "01050114", name: "Marg‘ilon tumani markazi" },
  ],

  // Qo‘qon
  "010502": [
    { id: "01050201", name: "Qo‘qon tumani markazi" },
    { id: "01050202", name: "Quva tumani" },
    { id: "01050203", name: "Rishton tumani" },
  ],

  // Marg‘ilon
  "010503": [
    { id: "01050301", name: "Marg‘ilon tumani markazi" },
    { id: "01050302", name: "Yozyovon tumani" },
    { id: "01050303", name: "Buvayda tumani" },
  ],

  // Quva
  "010504": [
    { id: "01050401", name: "Quva tumani markazi" },
    { id: "01050402", name: "Oltiariq tumani" },
    { id: "01050403", name: "Farg‘ona tumani" },
  ],

  // Rishton
  "010505": [
    { id: "01050501", name: "Rishton tumani markazi" },
    { id: "01050502", name: "Marg‘ilon tumani" },
    { id: "01050503", name: "Buvayda tumani" },
  ],

  // Jizzax shahri
  "010601": [
    { id: "01060101", name: "Jizzax tumani markazi" },
    { id: "01060102", name: "Arnasoy tumani" },
    { id: "01060103", name: "Baxmal tumani" },
    { id: "01060104", name: "Do‘stlik tumani" },
    { id: "01060105", name: "Forish tumani" },
    { id: "01060106", name: "G‘allaorol tumani" },
    { id: "01060107", name: "Mirzacho‘l tumani" },
    { id: "01060108", name: "Paxtakor tumani" },
    { id: "01060109", name: "Yangiobod tumani" },
    { id: "01060110", name: "Zafarobod tumani" },
    { id: "01060111", name: "Zarbdor tumani" },
    { id: "01060112", name: "Zomin tumani" },
  ],

  // Paxtakor shahri (agar markaz alohida bo‘lsa)
  "010602": [
    { id: "01060201", name: "Paxtakor tumani markazi" },
    { id: "01060202", name: "Yangiobod tumani" },
  ],

  // G‘allaorol shahri
  "010603": [{ id: "01060301", name: "G‘allaorol tumani markazi" }],

  // Zarbdor shahri
  "010604": [{ id: "01060401", name: "Zarbdor tumani markazi" }],

  // Urganch shahri
  "010701": [
    { id: "01070101", name: "Urganch tumani markazi" },
    { id: "01070102", name: "Bog‘ot tumani" },
    { id: "01070103", name: "Gurlan tumani" },
    { id: "01070104", name: "Hazorasp tumani" },
    { id: "01070105", name: "Xiva tumani" },
    { id: "01070106", name: "Xonqa tumani" },
    { id: "01070107", name: "Qo‘shko‘pir tumani" },
    { id: "01070108", name: "Shovot tumani" },
    { id: "01070109", name: "Tuproqqal‘a tumani" },
    { id: "01070110", name: "Yangibozor tumani" },
  ],

  // Xiva shahri
  "010702": [{ id: "01070201", name: "Xiva tumani markazi" }],

  // Pitnak shahri
  "010703": [{ id: "01070301", name: "Pitnak tumani markazi" }],

  // Gurlan shahri
  "010704": [{ id: "01070401", name: "Gurlan tumani markazi" }],

  // Namangan shahri
  "010801": [{ id: "01080101", name: "Namangan tumani markazi" }],

  // Chortoq shahri
  "010802": [{ id: "01080201", name: "Chortoq tumani markazi" }],

  // Chust shahri
  "010803": [{ id: "01080301", name: "Chust tumani markazi" }],

  // Kosonsoy shahri
  "010804": [{ id: "01080401", name: "Kosonsoy tumani markazi" }],

  // Navoiy shahri
  "010901": [{ id: "01090101", name: "Navoiy tumani markazi" }],

  // Zarafshon shahri
  "010902": [{ id: "01090201", name: "Zarafshon tumani markazi" }],

  // Uchquduq shahri
  "010903": [{ id: "01090301", name: "Uchquduq tumani markazi" }],

  // Karmana shahri
  "010904": [{ id: "01090401", name: "Karmana tumani markazi" }],

  // Qarshi shahri
  "011001": [{ id: "01100101", name: "Qarshi tumani markazi" }],

  // Kitob shahri
  "011002": [{ id: "01100201", name: "Kitob tumani markazi" }],

  // Shahrisabz shahri
  "011003": [{ id: "01100301", name: "Shahrisabz tumani markazi" }],

  // Koson shahri
  "011004": [{ id: "01100401", name: "Koson tumani markazi" }],

  // Nukus shahri
  "011101": [{ id: "01110101", name: "Nukus tumani markazi" }],

  // Xo‘jayli shahri
  "011102": [{ id: "01110201", name: "Xo‘jayli tumani markazi" }],

  // Taxiatosh shahri
  "011103": [{ id: "01110301", name: "Taxiatosh tumani markazi" }],

  // Beruniy shahri
  "011104": [{ id: "01110401", name: "Beruniy tumani markazi" }],

  // Samarqand shahri
  "011201": [{ id: "01120101", name: "Samarqand tumani markazi" }],

  // Kattaqo‘rg‘on shahri
  "011202": [{ id: "01120201", name: "Kattaqo‘rg‘on tumani markazi" }],

  // Urgut shahri
  "011203": [{ id: "01120301", name: "Urgut tumani markazi" }],

  // Bulung‘ur shahri
  "011204": [{ id: "01120401", name: "Bulung‘ur tumani markazi" }],

  // Guliston shahri
  "011301": [{ id: "01130101", name: "Guliston tumani markazi" }],

  // Sirdaryo shahri
  "011302": [{ id: "01130201", name: "Sirdaryo tumani markazi" }],

  // Yangiyer shahri
  "011303": [{ id: "01130301", name: "Yangiyer tumani markazi" }],

  // Termiz shahri
  "011401": [{ id: "01140101", name: "Termiz tumani markazi" }],

  // Denov shahri
  "011402": [{ id: "01140201", name: "Denov tumani markazi" }],

  // Boysun shahri
  "011403": [{ id: "01140301", name: "Boysun tumani markazi" }],

  // Sherobod shahri
  "011404": [{ id: "01140401", name: "Sherobod tumani markazi" }],
};

export const APIKEY = "Cwx5IFF36zGVlkPPoKvTuRaNdZ4_0ZfUzI-9-bL2t5s";

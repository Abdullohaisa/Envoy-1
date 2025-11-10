// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const DateNames = () => {
//   const monthNames = [
//     "Yanvar",
//     "Fevral",
//     "Mart",
//     "Aprel",
//     "May",
//     "Iyun",
//     "Iyul",
//     "Avgust",
//     "Sentabr",
//     "Oktabr",
//     "Noyabr",
//     "Dekabr",
//   ];

//   const weekDays = ["du", "se", "ch", "pa", "ju", "sh", "ya"];

//   return { monthNames, weekDays };
// };

// export default DateNames;

// const styles = StyleSheet.create({});

// import { t } from "i18next";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const DateNames = () => {
  const monthNames = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];

  const weekDays = [
    t("mon"),
    t("tue"),
    t("wed"),
    t("thu"),
    t("fri"),
    t("sat"),
    t("sun"),
  ];

  return { monthNames, weekDays };
};

export default DateNames;

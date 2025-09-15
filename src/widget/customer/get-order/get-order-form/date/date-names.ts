import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DateNames = () => {
  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const weekDays = ["du", "se", "ch", "pa", "ju", "sh", "ya"];

  return { monthNames, weekDays };
};

export default DateNames;

const styles = StyleSheet.create({});

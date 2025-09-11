import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  mamlakatlar,
  viloyatlar,
  shaharlar,
  tumanlar,
} from "@/constants/locations";
import SelectBottomSheet from "@/components/BottomSheets/BottomSheets";
import axios from "axios";

export default function LocationScreen() {
  const countrySheetRef = useRef<BottomSheetModal>(null);
  const regionSheetRef = useRef<BottomSheetModal>(null);
  const citySheetRef = useRef<BottomSheetModal>(null);
  const districtSheetRef = useRef<BottomSheetModal>(null);

  const [country, setCountry] = useState<{ id: string; name: string } | null>(
    null
  );
  const [region, setRegion] = useState<{ id: string; name: string } | null>(
    null
  );
  const [city, setCity] = useState<{ id: string; name: string } | null>(null);
  const [district, setDistrict] = useState<{ id: string; name: string } | null>(
    null
  );

  // ✅ Tanlangan manzillarni bir obyektga yig‘ish
  const selectedLocation = {
    country,
    region,
    city,
    district,
  };

  // ✅ Filterlar
  const filteredRegions = country ? viloyatlar[country.id] || [] : [];
  const filteredCities = region ? shaharlar[region.id] || [] : [];
  const filteredDistricts = city ? tumanlar[city.id] || [] : [];

  const locationString = [
    country?.name,
    region?.name,
    city?.name,
    district?.name,
  ]
    .filter(Boolean)
    .join(" ");

  // console.log("Xaritaga yuboriladigan manzil:", locationString);

  // const fetchData = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "https://envoy.odamqosh.com/customers/barcha-faol-yuklar?page=1&limit=20&car=10&city=13",
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3ODQ4MjI0LCJpYXQiOjE3NTY1NTIyMjQsImp0aSI6IjAzZGM0ZDYzZGQ2YTQzMGVhNzE5NzZlYmFmYzY3OTg1IiwidXNlcl9pZCI6Njh9.bsQSY6r4lVtlvJSYDrjLUbWydTgeGM3gQmxztwd-Lbg`,
  //         },
  //       }
  //     );
  //     console.log("data", data);
  //   } catch (error) {
  //     console.log("error -->", error.response?.status, error.response?.data);
  //   }
  // };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Manzilni tanlang</Text>

      {/* Country */}
      {/* <TouchableOpacity onPress={fetchData} style={styles.button}>
        <Text>{country ? country.name : "Mamlakatni tanlang"}</Text>
      </TouchableOpacity> */}

      {/* Region */}
      <TouchableOpacity
        onPress={() => regionSheetRef.current?.present()}
        style={[styles.button, { opacity: country ? 1 : 0.5 }]}
        disabled={!country}
      >
        <Text>{region ? region.name : "Viloyatni tanlang"}</Text>
      </TouchableOpacity>

      {/* City */}
      <TouchableOpacity
        onPress={() => citySheetRef.current?.present()}
        style={[styles.button, { opacity: region ? 1 : 0.5 }]}
        disabled={!region}
      >
        <Text>{city ? city.name : "Shaharni tanlang"}</Text>
      </TouchableOpacity>

      {/* District */}
      <TouchableOpacity
        onPress={() => districtSheetRef.current?.present()}
        style={[styles.button, { opacity: city ? 1 : 0.5 }]}
        disabled={!city}
      >
        <Text>{district ? district.name : "Tuman tanlang"}</Text>
      </TouchableOpacity>

      {/* Tanlangan manzilni ko‘rsatish */}
      <View style={{ marginTop: 20 }}>
        <Text>Tanlangan manzil:</Text>
        <Text>{JSON.stringify(selectedLocation, null, 2)}</Text>
      </View>

      {/* BottomSheets */}
      <SelectBottomSheet
        ref={countrySheetRef}
        data={mamlakatlar}
        onSelect={(item) => {
          setCountry(item);
          setRegion(null);
          setCity(null);
          setDistrict(null);
        }}
      />
      <SelectBottomSheet
        ref={regionSheetRef}
        data={filteredRegions}
        onSelect={(item) => {
          setRegion(item);
          setCity(null);
          setDistrict(null);
        }}
      />
      <SelectBottomSheet
        ref={citySheetRef}
        data={filteredCities}
        onSelect={(item) => {
          setCity(item);
          setDistrict(null);
        }}
      />
      <SelectBottomSheet
        ref={districtSheetRef}
        data={filteredDistricts}
        onSelect={setDistrict}
      />
    </View>
  );
}

const styles = {
  button: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 8,
  },
};

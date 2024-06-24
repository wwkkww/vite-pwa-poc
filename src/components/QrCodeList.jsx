// import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

const ListItem = ({ item }) => {
  const scanTime = new Date().toLocaleString();
  return (
    <div className="flex-col mx-4 py-1 border-b border-b-neutral-300">
      <p style={{ fontSize: 12 }} className="font-semibold text-neutral-800">
        {item}
      </p>
      <p style={{ fontSize: 12 }} className="font-medium text-neutral-500">
        {scanTime}
      </p>
    </div>
  );
};

const QrCodeList = ({ codes }) => {
  console.log("QrCodeList", codes);
  return (
    <div className="flex-1">
      {!codes || codes.length === 0 ? (
        <p className="text-center text-neutral-500">No QR Codes scanned yet</p>
      ) : (
        <ul>
          {codes.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default QrCodeList;

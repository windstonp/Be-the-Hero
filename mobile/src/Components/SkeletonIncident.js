import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import {View} from 'react-native';
import style from "./CssSkeleton";
const MyLoader = () =>(
  <View style={style.container}>
    {Array(3)
          .fill()
          .map((item,key) => (
            <ContentLoader
              key={key}
              speed={1.5}
              width={400}
              height={160}
              viewBox="0 0 400 200"
              backgroundColor="#c8c8c8"
              foregroundColor="#e02041"
            >
              <Rect x="18" y="100" rx="3" ry="3" width="75" height="20" /> 
              <Rect x="18" y="50" rx="3" ry="3" width="200" height="30" /> 
              <Rect x="280" y="140" rx="3" ry="3" width="50" height="15" /> 
              <Rect x="18" y="140" rx="3" ry="3" width="50" height="15" /> 
              <Rect x="18" y="10" rx="3" ry="3" width="140" height="20" />
            </ContentLoader>
            ))}
  </View>
)

export default MyLoader
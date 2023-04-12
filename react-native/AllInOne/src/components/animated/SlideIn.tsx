import React, {useRef, useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const SlideInView: React.FC<FadeInViewProps> = props => {
  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        translateX: slideAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      }}>
      <SlideInView
        style={{
          width: "100%",
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 26, textAlign: 'center', margin: 10}}>
          Sliding in
        </Text>
      </SlideInView>
    </View>
  );
};
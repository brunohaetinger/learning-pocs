import React, {useRef, useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type ComposedSlideViewProps = PropsWithChildren<{style: ViewStyle}>;

const ComposedSlideView: React.FC<ComposedSlideViewProps> = props => {
  const slideXAnim = useRef(new Animated.Value(500)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(slideXAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.2,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideXAnim, opacityAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        translateX: slideXAnim,
        opacity: opacityAnim,
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
      <ComposedSlideView
        style={{
          width: "100%",
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 26, textAlign: 'center', margin: 10}}>
          Composed Slide
        </Text>
      </ComposedSlideView>
    </View>
  );
};
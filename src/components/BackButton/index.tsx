import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
} from './styles';
import theme from '../../styles/theme';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  return(
    <Container {...rest}>
      <MaterialIcons
        size={24}
        color={color ? color : theme.colors.text}
        name="chevron-left"
      />
    </Container>
  );
}

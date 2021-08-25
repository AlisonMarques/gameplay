import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  border-radius: 8px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

import React, { ReactNode } from 'react';

import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from 'react-native';
import { Background } from '../Background';

import { style } from './style';

type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
};

export function ModalView({ children, closeModal, ...rest }: Props) {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={style.overlay}>
          <View style={style.container}>
            <Background>
              <View style={style.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

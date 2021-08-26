import React from 'react';

import { ContainerScroll } from './style';

import { categories } from '../../Utils/categories';
import { CardCategory } from '../CardCategory';

type Props = {
  categorySelected: string;
  hashCheckBox?: boolean;
  setCategory: (categoryId: string) => void;
};

export function CategorySelect({
  categorySelected,
  hashCheckBox = false,
  setCategory,
}: Props) {
  return (
    <ContainerScroll
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map((category) => (
        <CardCategory
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === categorySelected}
          onPress={() => setCategory(category.id)}
          hashCheckBox={hashCheckBox}
        />
      ))}
    </ContainerScroll>
  );
}

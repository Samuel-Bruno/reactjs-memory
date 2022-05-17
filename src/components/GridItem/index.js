import React from "react";
import * as C from './styles.js';

import b7Svg from '../../assets/svgs/b7.svg';
import items from '../../data/items.js';


const GridItem = ({item, onClick}) => {

  return (
    <C.Container onClick={onClick}
      showBackground={item.permanentShown || item.shown}
    >
      {item.permanentShown === false && item.shown === false &&
        <C.Icon src={b7Svg} alt="" opacity={.1} />
      }
      {(item.permanentShown || item.shown) && item.item !== null &&
        <C.Icon src={items[item.item].icon} alt="" />
      }
    </C.Container>
  )
  
}


export default GridItem;
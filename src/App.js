import { useEffect, useState } from 'react';

import * as C from './App.styles.js';
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './assets/svgs/restart.svg';
import Button from './components/Button/index.js';
import InfoItem from './components/InfoItem/index.js';
import GridItem from './components/GridItem/index.js';

import items from './data/items';
import formatTimeElapsed from './helpers/formatTimeElapsed.js';

function App() {

  const [playing, setPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [showCount, setShowCount] = useState(0);
  const [gridItems, setGridItems] = useState([]);

  const resetAndCreateGrid = () => {
    setPlaying(false);
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);
    setGridItems([]);

    let tmpGrid = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    setGridItems(tmpGrid);

    setPlaying(true);
  }

  const handleItemClick = (index) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];
      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tmpGrid);
    }
  }

  useEffect(resetAndCreateGrid, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (showCount === 2) {
      let tmpGrid = [...gridItems];

      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
        } else {
          setTimeout(() => {
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
          }, 1000);
        }

        setGridItems(tmpGrid);
        setShowCount(0);
        setMoveCount(moveCount + 1);
      }
    }
  }, [showCount, gridItems, moveCount]);

  useEffect(() => {
    if (moveCount > 0 && gridItems.every(item => item.shown === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);


  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width={200} alt="" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount} />
        </C.InfoArea>
        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>

    </C.Container>
  );
}

export default App;

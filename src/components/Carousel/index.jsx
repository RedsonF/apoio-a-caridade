/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import IconButton from 'components/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import styles from './styles.module.css';

const closeButtonStyle = {
  position: 'absolute',
  right: 5,
  top: 5,
  background: 'var(--blue)',
  color: 'var(--white)',
};

export default function Carousel({ images, removeImage, removeMode }) {
  const [index, setIndex] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const element = document.querySelector('#teste');

    if (flag && removeMode) {
      const { scrollWidth } = element;
      element.scrollBy(scrollWidth, 0);
    } else if (images.length > 0) {
      setFlag(true);
    }
  }, [images]);

  useEffect(() => {
    const element = document.querySelector('#teste');
    const { scrollWidth } = element;
    if (index > scrollWidth) {
      element.scrollBy(scrollWidth * 2, scrollWidth);
    } else {
      element.scrollBy(scrollWidth, scrollWidth * 2);
    }
  }, [index]);

  const remove = () => {
    const newIndex = index;
    setFlag(false);
    removeImage(newIndex);
  };

  const indexButton = () => (
    <div className={styles.points}>
      {images.map((img, i) => (
        <div
          key={img.url || img}
          style={{ background: i === index ? 'var(--blue)' : '' }}
          className={styles.point}
        />
      ))}
    </div>
  );

  const removeButton = () => (
    <IconButton onClick={() => remove()} style={closeButtonStyle}>
      <DeleteRoundedIcon className={styles.closeIcon} />
    </IconButton>
  );

  const change = (event) => {
    const { scrollLeft, clientWidth } = event.target;
    const slide = Math.floor(scrollLeft / clientWidth);
    setIndex(slide);
  };

  return (
    <div className={styles.itemsWrapper}>
      {images.length === 0 ? (
        <ImageRoundedIcon className={styles.icon} />
      ) : (
        <>
          <div onScroll={(e) => change(e)} id="teste" className={styles.items}>
            {images.map((img) => (
              <div key={img.url || img} className={styles.item}>
                {removeMode && removeButton()}
                <img
                  className={styles.image}
                  src={img.url || img}
                  alt="imagem"
                />
              </div>
            ))}
          </div>
          {images.length > 1 && indexButton()}
        </>
      )}
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import styles from './index.module.scss';
import BaseButton from '../BaseButton';
import useTranslation from '../../hooks/useTranslation';

export default function ImageCrop(props) {
  const { t } = useTranslation();
  const [upImg, setUpImg] = useState();
  const [buttonIcon, setButtonIcon] = useState(false);
  const [imgRef, setImgRef] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [lockedCrop, setLockedCrop] = useState({
    disabled: true,
  });
  const [hiddenModal, setViewModal] = useState(styles.cropImage__closeModal);
  const [crop, setCrop] = useState({
    x: 75,
    y: 25.52,
    width: 150,
    height: 150,
    unit: 'px',
    aspect: 1,
  });
  const [imgStyle, setimgStyle] = useState();
  const [buttonResize, setButtonResize] = useState({
    disabled: false,
    className: 'BtnCrop',
    title: t('imageCrop.scale'),
    type: 'button',
  });

  const [buttonCrop, setButtonCrop] = useState({
    disabled: false,
    className: 'btnBlue',
    title: t('imageCrop.select'),
    type: 'button',
    classHover: 'hvr-radial-out',
  });

  const [buttonCancel, setButtonCancel] = useState({
    disabled: false,
    className: 'BtnCancel',
    title: t('imageCrop.cancel'),
    type: 'button',
  });
  const disabledResize = () => {
    let disabled = !lockedCrop.disabled;
    setLockedCrop({
      ...lockedCrop,
      disabled: disabled,
    });
  };
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setViewModal('');
    }
  };
  const closeModal = () => {
    let inputFile = document.querySelector('#imageInputFile');
    inputFile.value = '';
    setViewModal(styles.cropImage__closeModal);
  };
  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        props.setImage(blob);
        setButtonIcon(true);
        setViewModal(styles.cropImage__closeModal);
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };
  const onLoad = useCallback(img => {
    if (img.height > img.width) {
      setimgStyle(styles.cropImage__cropContainer__imgHeight);
    } else {
      setimgStyle(styles.cropImage__cropContainer__imgWidth);
    }
    setImgRef(img);
  }, []);
  const makeClientCrop = async crop => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, 'newFile.jpeg');
    }
  };
  const selectFile = () => {
    let inputFile = document.querySelector('#imageInputFile');
    inputFile.click();
  };
  const openCropEditor = e => {
    if (e.target.tagName == 'IMG') {
      setViewModal('');
    } else if (e.target.id == 'openCropEditor') {
      selectFile();
    }
  };

  const newImgCrop = newCrop => {
    setCrop(newCrop);
  };
  const selectImg = () => {
    makeClientCrop(crop);
  };
  return (
    <div>
      <div className={styles.cropImage}>
        <div
          id="openCropEditor"
          className={styles.imageViewer}
          onClick={openCropEditor}>
          <div
            className={`${styles.imageViewer__btnImageViewer} ${
              !buttonIcon
                ? styles.imageViewer__btnImageViewerAdd
                : styles.imageViewer__btnImageViewerEdit
            }`}
            onClick={selectFile}></div>
          {previewUrl && <img alt="Crop preview" src={previewUrl} />}
        </div>
        <input
          accept="image/x-png,image/jpeg"
          className={styles.hidden}
          id="imageInputFile"
          type="file"
          onChange={onSelectFile}
        />
        <div className={`${styles.cropImage__fabeOut} ${hiddenModal}`}>
          <div className={`${styles.cropImage__cropContainer} ${imgStyle}`}>
            <div className={styles.cropImage__cropContainer__imageContainer}>
              <ReactCrop
                locked={lockedCrop.disabled}
                className={`${styles.imageCrop}`}
                src={upImg}
                crop={crop}
                onChange={newImgCrop}
                onImageLoaded={onLoad}
              />
            </div>
            <div className={styles.cropImage__cropContainer__buttonContainer}>
              <div>
                <BaseButton
                  properties={buttonResize}
                  onClick={disabledResize}
                />
              </div>
              <div className={styles.cropImage__cropContainer__widthButton}>
                <BaseButton properties={buttonCrop} onClick={selectImg} />
              </div>
              <div>
                <BaseButton properties={buttonCancel} onClick={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

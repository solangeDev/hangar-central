import React from 'react';

import styles from './index.module.scss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function BaseCheckbox(props) {
  const className = 'Checkbox';
  let iconClassCheck = `${className}__iconBlue`;
  if (props.properties.iconClass !== undefined) {
    iconClassCheck = `${className}__${props.properties.iconClass}`;
  }
  iconClassCheck = `${styles[iconClassCheck]}`;
  let iconClassEnable = `${className}__checkedIcon`;
  iconClassEnable = `${styles[iconClassEnable]}`;

  let rootClass = styles.Checkbox__root;
  if (
    props.properties.label !== undefined &&
    props.properties.label !== null &&
    props.properties.label !== ''
  ) {
    rootClass = styles.Checkbox__rootLabel;
  }

  return (
    <div>
      <FormControlLabel
        classes={{
          root: rootClass,
          label: rootClass,
        }}
        control={
          <Checkbox
            classes={{
              root: rootClass,
            }}
            checked={props.properties.value}
            onChange={props.onChange}
            icon={<i className={`icon-disable-check ${iconClassCheck}`}></i>}
            checkedIcon={
              <span className={`icon-enable-check ${iconClassEnable}`}>
                <span className="path1"></span>
                <span className="path2"></span>
              </span>
            }
            name={props.properties.name}
          />
        }
        label={props.properties.label}
      />
    </div>
  );
}
export default BaseCheckbox;

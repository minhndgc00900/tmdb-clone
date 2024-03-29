import React from 'react';

import styles from './styles.module.scss';

interface SwitchInputI {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwitchInput = (props: SwitchInputI) => {
  const { isChecked, setIsChecked } = props;

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default SwitchInput;

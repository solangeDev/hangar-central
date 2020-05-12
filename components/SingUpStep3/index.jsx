import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import BaseInputDate from '../BaseInputDate';
import BaseInput from '../BaseInput';
import BaseInputPhone from '../BaseInputPhone';
import BaseSelectNativo from '../BaseSelectNativo';
import { listCountries } from '../../services/countries';
import { createUser } from '../../services/user';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import BaseButton from '../../components/BaseButton';
import { validate } from './validate';
import ImageCrop from '../../components/ImageCrop';
import Moment from 'moment';
import NotificationAlert from '../../components/NotificationAlert';
import { fullAgeValidate, maxLengthPhone } from '../../constants';
import Router from 'next/router';

function Step3(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const countries = async e => {
    let state = { ...formData };
    if (state.country.options.length === 0) {
      const data = await listCountries({
        locale: locale,
      });
      let responseData = data.data !== undefined ? data.data : false;
      if (responseData === false) {
        setNotificationAlert({
          ...notificationAlert,
          status: 'error',
          isShow: true,
          description: t('server.error'),
        });
      } else {
        if (data.data.success) {
          const result = data.data.result;
          state.country.disabled = false;
          state.country.options = result.map(a => {
            let b = { ...a };
            b.value = b.id;
            b.text = b.name;
            return b;
          });
          setFormData(state);
        }
      }
    }
  };

  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: true,
    className: 'btnBlue',
    title: t('stepRegister3.buttonForm'),
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });

  const [imageProfile, setImageProfile] = useState({
    value: '',
  });

  const [formData, setFormData] = useState({
    name: {
      value: '',
      id: 'name',
      label: t('stepRegister3.inputName'),
      type: 'text',
      name: 'name',
      path: t('stepRegister3.inputName'),
      error: false,
      helperText: '',
      maxlength: 30,
      required: true,
    },
    last_name: {
      value: '',
      id: 'last_name',
      label: t('stepRegister3.inputLastName'),
      type: 'text',
      name: 'last_name',
      path: t('stepRegister3.inputLastName'),
      error: false,
      helperText: '',
      maxlength: 30,
      required: true,
    },
    date: {
      value: null,
      id: 'date',
      label: t('stepRegister3.inputBirth'),
      name: 'date',
      path: t('stepRegister3.inputBirth'),
      error: false,
      helperText: '',
      format: 'dd/MM/yyyy',
      minDateMessage: t('stepRegister3.minDateMessage'),
      required: true,
      maxDate: Moment()
        .subtract(fullAgeValidate, 'years')
        .format('YYYY-MM-DD'),
    },
    gender: {
      disabled: false,
      value: '',
      id: 'gender',
      name: 'gender',
      label: t('stepRegister3.inputGender'),
      path: t('stepRegister3.inputGender'),
      error: false,
      helperText: '',
      idLabel: 'gender-label',
      options: [
        { value: 'female', text: t('stepRegister3.optionFemale') },
        { value: 'male', text: t('stepRegister3.optionMale') },
      ],
      required: true,
    },
    country: {
      disabled: true,
      value: '',
      id: 'country',
      name: 'country',
      label: t('stepRegister3.inputCountry'),
      path: t('stepRegister3.inputCountry'),
      error: false,
      helperText: '',
      idLabel: 'country-label',
      options: [],
      required: true,
    },
    phone: {
      disabled: true,
      value: '',
      id: 'phone',
      label: t('stepRegister3.inputPhone'),
      type: 'text',
      name: 'phone',
      path: t('stepRegister3.inputPhone'),
      error: false,
      helperText: '',
      icon: 'icon-locked',
      phoneCode: null,
      maxlength: 11,
      required: true,
    },
  });

  const [notificationAlert, setNotificationAlert] = useState({
    description: false,
    isShow: false,
    status: '',
  });

  useEffect(() => {
    countries();
  }, [formData.country.options]);

  const inputValueArray = Object.keys(formData)
    .filter(key => {
      if (formData[key].required) {
        return key;
      }
    })
    .map(a => {
      return formData[a].value;
    });

  useEffect(() => {
    const valuesHaveLength = inputValueArray.reduce((acc, value) => {
      if (value !== '' && value !== null) return ++acc;
      return acc;
    }, 0);
    let val = valuesHaveLength ? false : true;
    setButtonSubmit({ ...buttonSubmit, disabled: val, loading: false });
  }, inputValueArray);

  const handleInputDateChange = e => {
    let state = { ...formData };
    if (e !== null) {
      const date = new Date(e);
      if (date.toString() !== 'Invalid Date') {
        state.date.value = date;
      }
    } else {
      state.date.value = null;
    }
    state.date.helperText = '';
    state.date.error = false;
    setFormData(state);
  };

  const handleChange = e => {
    const { value, name } = e.target;
    let state = { ...formData };
    if (name === 'name' || name === 'last_name') {
      if (value === '' || /^[a-zA-ZñÑáéíóúÁÉÍÓÚ.',&\s]+$/.test(value)) {
        state[name].value = value;
        state[name].error = false;
        state[name].helperText = '';
      }
    } else {
      state[name].value = value;
      state[name].error = false;
      state[name].helperText = '';
    }
    setFormData(state);
  };

  const handleChangeInputPhone = e => {
    const { value, name } = e.target;
    let state = { ...formData };
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      state[name].value = value;
      state[name].error = false;
      state[name].helperText = '';
      setFormData(state);
    }
  };

  const handleChangeCountry = e => {
    const { value } = e.target;
    let state = { ...formData };
    state.country.value = value;
    state.country.error = false;
    state.country.helperText = '';
    const val = state.country.options.filter(a => {
      if (value === a.id) {
        return a;
      }
    });
    if (val.length > 0) {
      state.phone.phoneCode = val[0].phone_code;
      state.phone.error = false;
      state.phone.value = '';
      state.phone.disabled = false;
      state.phone.helperText = '';
      state.phone.maxlength =
        maxLengthPhone - parseInt(val[0].phone_code.length);
    }
    setFormData(state);
  };

  const handleChangeImageProfile = props => {
    if (props) {
      var reader = new FileReader();
      reader.readAsDataURL(props);
      reader.onloadend = function() {
        var base64data = reader.result;
        setImageProfile({ ...imageProfile, value: base64data });
      };
    }
  };

  const getFormData = form => {
    let result = [];
    for (let data of form) {
      let obj = {};
      let label = '';
      if (
        formData[data.name] !== undefined &&
        formData[data.name].path !== undefined
      ) {
        label = formData[data.name].path;
      }
      if (data.name !== '') {
        obj.name = data.name;
        obj.value = data.value.trim();
        obj.path = label;
        result.push(obj);
      }
    }
    return result;
  };

  const showErrorsForm = (form, response) => {
    let objForm = {};
    for (let data of form) {
      objForm[data.name] = data.value;
    }
    const paths = Object.keys(objForm);
    const errors = paths
      .map(a => {
        let count = 0;
        let c = {};
        const errors = response.data.filter(c => {
          if (c.input === a) {
            count++;
            if (count === 1) {
              return c;
            }
          }
        });
        c[a] = errors;
        return c;
      })
      .filter(a => {
        if (Object.values(a)[0].length > 0) {
          return a;
        }
      });
    errors.forEach(a => {
      let state = { ...formData };
      state[Object.keys(a)[0]].error = true;
      state[Object.keys(a)[0]].helperText = t(Object.values(a)[0][0].message);
      setFormData(state);
    });
  };

  const handleOnClickIconClose = () => {
    setNotificationAlert({
      ...notificationAlert,
      isShow: false,
    });
  };

  const saveUser = async () => {
    setButtonSubmit({ ...buttonSubmit, disabled: true, loading: true });
    const phone = `${formData.phone.phoneCode}${formData.phone.value}`;
    await createUser({
      locale: locale,
      image_profile: imageProfile.value,
      first_name: formData.name.value,
      last_name: formData.last_name.value,
      email: props.email,
      password: props.password,
      gender: formData.gender.value,
      birth_date: Moment(formData.date.value).format('YYYY-MM-DD'),
      phone: phone,
      country_id: formData.country.value,
    })
      .then(function(data) {
        let message = '';
        if (data.data.success) {
          message = data.data.message;
          setNotificationAlert({
            ...notificationAlert,
            status: 'success',
            isShow: true,
            description: message,
          });
          cleanForm();
          props.setUser({
            first_name: data.data.result.first_name,
            last_name: data.data.result.last_name,
            image_profile: data.data.result.image_profile,
            image_background: data.data.result.image_background,
            slug: data.data.result.slug,
            phone: data.data.result.phone,
            token_type: data.data.result.token.token_type,
            expires_in: data.data.result.token.expires_in,
            access_token: data.data.result.token.access_token,
            refresh_token: data.data.result.token.refresh_token,
            email: data.data.result.email,
            country_id: data.data.result.country.id,
            country_name: data.data.result.country_name,
            birth_date: data.data.result.birth_date,
          });
          props.setRegister({
            email: '',
            password: '',
            validateCode: false,
          });
          setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
          Router.push('/[locale]/step-4', `/${locale}/step-4`, {
            shallow: true,
          });
        } else {
          let count = 0;
          Object.keys(data.data.message).forEach(a => {
            count++;
            if (count === 1 && data.data.message[a].length > 0) {
              message = data.data.message[a][0];
            }
          });
          setNotificationAlert({
            ...notificationAlert,
            status: 'error',
            isShow: true,
            description: message,
          });
          setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const cleanForm = () => {
    let state = { ...formData };
    state.name.value = '';
    state.last_name.value = '';
    state.country.value = '';
    state.phone.value = '';
    state.phone.disabled = true;
    state.phone.phoneCode = '';
    state.date.value = null;
    state.gender.value = '';
    setFormData(state);
    setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = getFormData(e.target);
    const response = await validate(form, locale);
    if (response.data.length > 0) {
      showErrorsForm(form, response);
    } else {
      if (!formData.date.error) {
        await saveUser();
      }
    }
  };

  return (
    <div className={styles.Step3}>
      <NotificationAlert
        onClickIconClose={handleOnClickIconClose}
        properties={notificationAlert}></NotificationAlert>
      <form onSubmit={handleSubmit}>
        <div className={styles.Step3__container}>
          <h3 className={styles.Step3__title}>{t('stepRegister3.title')}</h3>
          <div className={styles.Step3__imageCrop}>
            <ImageCrop
              properties={imageProfile}
              setImage={handleChangeImageProfile}
            />
          </div>
          <div className={styles.Step3__row}>
            <BaseInput
              error={formData.name.error}
              value={formData.name.value}
              onChange={handleChange}
              properties={formData.name}></BaseInput>
          </div>
          <div className={styles.Step3__row}>
            <BaseInput
              error={formData.last_name.error}
              value={formData.last_name.value}
              onChange={handleChange}
              properties={formData.last_name}></BaseInput>
          </div>
          <div className={styles.Step3__row}>
            <BaseInputDate
              locale={locale}
              onChange={handleInputDateChange}
              properties={formData.date}></BaseInputDate>
            <span className={styles.Step3__helperText}>
              {t('stepRegister3.validBirthday')}
            </span>
          </div>
          <div className={styles.Step3__row}>
            <BaseSelectNativo
              properties={formData.gender}
              onChange={handleChange}></BaseSelectNativo>
          </div>
          <div className={styles.Step3__row}>
            <BaseSelectNativo
              properties={formData.country}
              onChange={handleChangeCountry}></BaseSelectNativo>
          </div>
          <div className={styles.Step3__row}>
            <BaseInputPhone
              error={formData.phone.error}
              value={formData.phone.value}
              onChange={handleChangeInputPhone}
              properties={formData.phone}></BaseInputPhone>
            <span className={styles.Step3__helperText}>
              {t('stepRegister3.labelPhone')}
            </span>
          </div>
          <div className={styles.Step3__rowButton}>
            <BaseButton properties={buttonSubmit}></BaseButton>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Step3;

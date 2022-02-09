import * as storage from '../services/localStorage';

const throttle = require('lodash.throttle');
const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const inputHandler = e => {
  const { name, value } = e.target;
  const parsedData = storage.get(STORAGE_KEY) ?? {};
  const formData = {
    ...parsedData,
    [name]: value,
  };
  console.log();
  storage.save(STORAGE_KEY, formData);
};

const rehydrateData = () => {
  const parsedData = storage.get(STORAGE_KEY) ?? {};
  const {
    elements: { email, message },
  } = formRef;
  email.value = parsedData?.email || '';
  message.value = parsedData?.message || '';
};

rehydrateData();

const submitHandler = e => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const finalData = {};
  for (const [key, value] of formData.entries()) {
    if (!value) {
      alert('Please fill in all the fields!');
      return;
    }
    finalData[key] = value;
  }
  console.log(finalData);

  form.reset();
  // localStorage.removeItem(STORAGE_KEY);
  storage.remove(STORAGE_KEY);
};

formRef.addEventListener('input', throttle(inputHandler, 500));
formRef.addEventListener('submit', submitHandler);

// const formRefs = document.querySelector('.feedback-form');
// const LOCALSTORAGE_KEY = 'feedback-form-state';
// // const btnRefs = document.querySelector('button');
// // console.log(btnRefs);

// formRefs.addEventListener('input', onFormInput);

// function onFormInput(e) {
//   const { email, message } = e.target.form.elements;
//   const saveObj = {
//     [email.name]: email.value,
//     [message.name]: message.value,
//   };
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saveObj));
// }
// const localObj = localStorage.getItem(LOCALSTORAGE_KEY, 'saveObj') || {};
// console.log(localObj);
// const saveObjNew = JSON.parse(localObj);
// formRefs.elements.message.value = saveObjNew.message;
// formRefs.elements.email.value = saveObjNew.email;
// console.log(saveObjNew.message);

// formRefs.addEventListener('submit', submitHandler);
// function submitHandler(e) {
//   //   e.preventDefault();
//   const form = e.currenTarget;
//   form.reset();
//   localStorage.getItem(LOCALSTORAGE_KEY, 'saveObj');
//   console.log(saveObj);
// }
//
//
//
//
//   const form = e.currentTarget;
//   const formData = new FormData(form);
//   const finalData = {};

//   // formData.forEach((value, key) => {
//   //   if (!value) {
//   //     alert('Please fill in all the fields!');
//   //     return;
//   //   }
//   //   finalData[key] = value;
//   // });

//   for (const [key, value] of formData.entries()) {
//     if (!value) {
//       alert('Please fill in all the fields!');
//       return;
//     }
//     finalData[key] = value;
//   }

//   finalData.canBeSpammed = !!finalData.canBeSpammed;
//   // finalData.canBeSpammed = Boolean(finalData.canBeSpammed);

//   // if (finalData.canBeSpammed) {
//   //   finalData.canBeSpammed = true;
//   // } else {
//   //   finalData.canBeSpammed = false;
//   // }

//   console.log(finalData);

// localStorage.removeItem(STORAGE_KEY);

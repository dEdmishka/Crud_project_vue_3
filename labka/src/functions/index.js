//export const namePattern = value => /^[A-Z]+[a-z '-.,`]{1,64}$|^[А-ЯЄІ]+[а-яєі '-.,`]{1,64}$/gm.test(value);
// export const passwordPattern = value => /^[A-za-z0-9_]{8,16}$/.test(value);
//export const formatDate = (date) => {
//     let d = new Date(date);
//     let month = (d.getMonth() + 1).toString();
//     let day = d.getDate().toString();
//     let year = d.getFullYear();
//     if (month.length < 2) {
//         month = '0' + month;
//     }
//     if (day.length < 2) {
//         day = '0' + day;
//     }
//     return [year, month, day].join('-');
// }
export const namePattern = value => /^[A-Za-z '-.,`]{1,64}$|^[А-ЯЄІЇа-яєії '-.,`]{1,64}$/gm.test(value);
export const personNamePattern = value => /^[A-Z]+[a-z '-.,`]{1,64}$|^[А-ЯЄІЇ]+[а-яєії '-.,`]{1,64}$/gm.test(value);
export const groupPattern = value => /^[A-Za-z]{1,2}-[0-9]{1,2}$|^[A-Za-z]{1,2}-[0-9]{1,2}[A-Za-z]{1,3}$|^[А-ЯЄІЇа-яєії]{1,2}-[0-9]{1,2}$|^[А-ЯЄІЇа-яєії]{1,2}-[0-9]{1,2}[А-ЯЄІЇа-яєії]{1,3}$/gm.test(value);


const data = [
  {
    id: 'TCH1',
    lastName: 'Thay',
    firstName: 'Do',
    gender: true,
    phoneNumber: '100001001',
    email: 'nguyenthay@gmail.com',
    username: 'nguyen_tc',
    password: '123456'
  }
];

module.exports.getAll = () => data;

module.exports.findById = (teacherId) => data.find(({ id }) => id === teacherId);

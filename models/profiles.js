/* eslint-disable no-unused-vars */
const data = {
  id: 'std00001',
  name: 'Bùi Nguyên Nghĩa',
  dob: '09/02/2001',
  gender: 'Male',
  email: '19120600@student.hcmus.edu.vn',
  phone: '0353049456',
  workplace: 'FIT@HCMUS',
  descripsion: '..................',
  courses: [
    {
      title: 'New Lectures Meeting',
      desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
      link: '/courses/course-details',
      imageLink: '/assets/images/meeting-01.jpg',
      price: 14,
      date: new Date('12 Nov'),
      tag: 'soon'
    },
    {
      title: 'Online Teaching Techniques',
      desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
      link: '/courses/course-details',
      imageLink: '/assets/images/meeting-02.jpg',
      price: 21,
      date: new Date('24 Dec'),
      tag: 'imp'
    },
    {
      title: 'Online Teaching Techniques',
      desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
      link: '/courses/course-details',
      imageLink: '/assets/images/meeting-03.jpg',
      price: 21,
      date: new Date('24 Dec'),
      tag: 'att'
    }
  ]

};
module.exports = data;

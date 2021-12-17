const data = [
  {
    id: 'C01',
    title: 'New Lectures Meeting',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-01.jpg',
    price: 14,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('12 Nov'),
    tag: 'soon',
    teacherId: 'TCH1'
  },
  {
    id: 'C02',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-02.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'imp',
    teacherId: 'TCH1'
  },
  {
    id: 'C03',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-03.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'att',
    teacherId: 'TCH1'
  },
  {
    id: 'C04',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-03.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'att',
    teacherId: 'TCH1'
  },
  {
    id: 'C05',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-04.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'soon',
    teacherId: 'TCH1'
  },
  {
    id: 'C06',
    title: 'New Lectures Meeting',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-01.jpg',
    price: 14,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('12 Nov'),
    tag: 'soon',
    teacherId: 'TCH2'
  },
  {
    id: 'C07',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-02.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'imp',
    teacherId: 'TCH1'
  },
  {
    id: 'C08',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-03.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'att',
    teacherId: 'TCH2'
  },
  {
    id: 'C09',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-03.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'att',
    teacherId: 'TCH3'
  },
  {
    id: 'C10',
    title: 'Online Teaching Techniques',
    desc: 'Morbi in libero blandit lectus cursus ullamcorper.',
    link: '/courses/course-details',
    imageLink: '/assets/images/meeting-04.jpg',
    price: 21,
    startTime: new Date(0, 0, 0, 8, 30),
    endTime: new Date(0, 0, 0, 10, 0),
    startDate: new Date('24 Dec'),
    tag: 'soon',
    teacherId: 'TCH3'
  }
];

module.exports.findByTeacherId = (id) => data.filter(({ teacherId }) => teacherId === id);

module.exports.findById = (courseId) => data.find(({ id }) => id === courseId);

module.exports.getAll = () => data;

module.exports.toRenderData = course => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatTime = time => `${('0' + time.getHours()).slice(-2)}:${('0' + time.getSeconds()).slice(-2)}`;
  const { startDate, startTime, endTime } = course;
  return {
    ...course,
    month: months[startDate.getMonth()],
    formattedStartTime: formatTime(startTime),
    formattedEndTime: formatTime(endTime)
  };
};

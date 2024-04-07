import { plane, blog, user } from './Icons';

const menu = [
    {
        id: 1,
        title: 'Users',
        icon: user,
        link: '/manager',
    },
    {
        id: 2,
        title: 'Destinations',
        icon: plane,
        link: '/manager/destinations',
    },
    {
        id: 3,
        title: 'Blogs',
        icon: blog,
        link: '/manager/blogs',
    },
];

export default menu;
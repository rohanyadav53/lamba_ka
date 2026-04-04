// src/data/platformData.ts

export const NAVY  = '#0b1f3a';
export const GREEN = '#22c55e';

export const universities = [
  { id: 'manipal', name: 'Manipal University', location: 'Jaipur, Rajasthan', rating: 4.8, image: '/uni-manipal.jpg', accreditation: 'NAAC A+', tags: ['Management', 'Technology', 'Commerce'], courses: 5 },
  { id: 'sharda', name: 'Sharda University', location: 'Greater Noida, UP', rating: 4.5, image: '/uni-sharda.jpg', accreditation: 'NAAC A', tags: ['Management', 'Technology', 'Arts'], courses: 5 },
  { id: 'amity', name: 'Amity University', location: 'Noida, UP', rating: 4.6, image: '/uni-amity.jpg', accreditation: 'NAAC A+', tags: ['Management', 'Commerce', 'Law'], courses: 5 },
  { id: 'upgrad', name: 'upGrad', location: 'Mumbai (Online)', rating: 4.9, image: '/uni-upgrad.jpg', accreditation: 'University Partnered', tags: ['Management', 'Technology', 'Data Science'], courses: 4 },
  { id: 'lpu', name: 'LPU Online', location: 'Phagwara, Punjab', rating: 4.5, image: '/uni-lpu.jpg', accreditation: 'NAAC A++', tags: ['Technology', 'Management', 'Commerce'], courses: 4 },
  { id: 'vgu', name: 'VGU Online', location: 'Jaipur, Rajasthan', rating: 4.1, image: '/uni-vgu.jpg', accreditation: 'NAAC B++', tags: ['Management', 'Commerce'], courses: 4 },
];

export const featuredCourses = [
  { category: 'Management', name: 'MBA', university: 'Manipal University Jaipur Online', fee: '₹1,25,000/year', duration: '2 Years', highlights: ['Industry mentorship', 'Live projects', '15+ specializations'] },
  { category: 'Technology', name: 'MCA', university: 'Manipal University Jaipur Online', fee: '₹1,00,000/year', duration: '2 Years', highlights: ['Programming focused', 'Cloud computing', 'AI/ML modules'] },
  { category: 'Management', name: 'MBA', university: 'Amity University Noida Online', fee: '₹1,50,000/year', duration: '2 Years', highlights: ['Top brand value', 'Global alumni network', '20+ specializations'] },
  { category: 'Technology', name: 'M.Sc Data Science', university: 'Amity University Noida Online', fee: '₹1,30,000/year', duration: '2 Years', highlights: ['Python & R', 'Machine learning', 'Big data analytics'] },
  { category: 'Technology', name: 'Data Science', university: 'upGrad', fee: '₹3,40,000 total', duration: '11 Months', highlights: ['Python & ML', 'Industry projects', '500+ hiring partners'] },
  { category: 'Technology', name: 'Full Stack Dev', university: 'upGrad', fee: '₹2,99,000 total', duration: '13 Months', highlights: ['MERN stack', 'System design', 'Job guarantee*'] },
  { category: 'Management', name: 'MBA', university: 'LPU Online', fee: '₹1,20,000/year', duration: '2 Years', highlights: ['10+ Specialisations', 'Bloomberg Access', '700+ Recruiters'] },
  { category: 'Technology', name: 'B.Tech (CSE)', university: 'LPU Online', fee: '₹1,40,000/year', duration: '4 Years', highlights: ['Virtual Labs', 'AI/ML Curriculum', 'Coding Bootcamp'] },
  { category: 'Management', name: 'BBA', university: 'Sharda University Online', fee: '₹80,000/year', duration: '3 Years', highlights: ['Entrepreneurship Track', 'Internship Credits', 'Live Projects'] },
  { category: 'Commerce', name: 'B.Com', university: 'VGU Online', fee: '₹50,000/year', duration: '3 Years', highlights: ['GST & Taxation', 'Accounting Software', 'Finance Electives'] },
  { category: 'Commerce', name: 'M.Com', university: 'Manipal University Jaipur Online', fee: '₹75,000/year', duration: '2 Years', highlights: ['Advanced Accounting', 'Business Finance', 'Research Methods'] },
  { category: 'Management', name: 'PGDM', university: 'upGrad', fee: '₹2,00,000/year', duration: '12 Months', highlights: ['400+ Hiring Partners', 'Salary Hike Guarantee', 'Weekend Live'] },
];